import React, { useState, useContext, useEffect, useRef } from 'react';
import Layout from 'layout';
import { saveAs } from 'file-saver';
import { AppContext } from 'context/AppContext';
import { WalletButton, LoadingModal, GenericModal } from 'components';
import { ModelCardMedia, ModelCardContent } from 'components/ModelCard';
import useMediaQuery from '@mui/material/useMediaQuery';
import mockGraphData from 'utils/mockGraphData.json';
import { Typography, Box, useTheme, Button } from '@mui/material';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { FaRegHandshake, FaRegCheckCircle, FaTicketAlt } from 'react-icons/fa';
import { BiDownload } from 'react-icons/bi';
import { useContract } from 'hooks';
import { InstructionCard, InstructionRow } from 'components/InstructionCard';
import { getTransactionUrl } from 'utils/constants';
import { useNavigate } from 'react-router';

const IconBox = styled(Box)`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const buttonWidth = '200px';
const StandardButton = styled(Button)`
  min-width: ${buttonWidth};
`;

const ModelPreview = () => {
  const theme = useTheme();
  const { provider, signer } = useContext(AppContext);
  const { getSingleModelDescription, purchaseModel, getData, getReceipt } =
    useContract(provider, signer);
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [hasReceipt, setHasReceipt] = useState();
  const [model, setModel] = useState();
  const isXs = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  const [txUrl, setTxUrl] = useState('');
  const [showUnavailable, setShowUnavailable] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState(
    'Confirming transaction',
  );
  const interval = useRef();
  const navigate = useNavigate();

  const [modelDetails, setModelDetails] = useState({
    modelName: '',
    dapps: [],
    description: '',
    url: '',
  });

  useEffect(() => {
    (async () => {
      try {
        setShowUnavailable(false);
        const modelDetails = await getSingleModelDescription(id);
        setModelDetails(modelDetails);
      } catch (e) {
        console.error(e);
        setShowUnavailable(true);
      }

      try {
        const alreadyPurchased = await getReceipt(id);
        if (alreadyPurchased) {
          setHasReceipt(true);
          return;
        }
      } catch (e) {
        console.error(e);
      }
    })();
  }, [signer]);

  async function handleTransaction(id) {
    try {
      const alreadyPurchased = await getReceipt(id);
      console.log(alreadyPurchased);
      if (alreadyPurchased) {
        setHasReceipt(true);
        return;
      }
    } catch (e) {
      console.error(e);
    }

    setIsLoading(true);
    try {
      const purchase = await purchaseModel(id);
      setTxUrl(getTransactionUrl(purchase.hash));
      await purchase.wait();
      pollReceipt(id);
    } catch (e) {
      setIsLoading(false);
      console.log(e.message);
      if (e.code === -32603) {
        alert('need more $INDG');
      } else {
        alert(e.message);
      }
    }
  }

  function pollReceipt(receiptId) {
    clearInterval(interval.current); // clean up any old timers
    let count = 0;
    interval.current = setInterval(async () => {
      let receipt;
      setLoadingMessage(
        'Confirming receipt, this could take up to a minute' +
          '.'.repeat(count % 3),
      );
      count += 1;

      try {
        receipt = await getReceipt(receiptId);
        if (receipt) {
          setIsLoading(false);
          setHasReceipt(receipt);
          clearInterval(interval.current);
          setLoadingMessage('Confirming transaction');
        }
      } catch (e) {
        console.log(e);
      }
    }, 1000);
  }

  async function handleRedeem() {
    setTxUrl('');
    setIsLoading(true);
    try {
      let receipt = await getReceipt(id);
      if (receipt) {
        let modelData = await getData(modelDetails.url, id, receipt);
        console.log(modelData);
        modelData = mockGraphData;

        setModel(modelData);
        setIsLoading(false);
      }
    } catch (e) {
      console.error(e);
      // temp workaround for getReceipt
      setModel(mockGraphData);
      setIsLoading(false);
    }
  }

  // saving data annoyingly refreshes the page when using
  // webpack dev hot reloading. does not refresh on test or prod
  function handleDownload(e) {
    var blob = new Blob([JSON.stringify(model)], {
      type: 'text/json;charset=utf-8',
    });
    saveAs(blob, `${id}.json`);

    e.preventDefault();
    e.stopPropagation();
    return false;
  }

  return (
    <Layout hideImage noGradient>
      <LoadingModal
        isLoading={isLoading}
        href={txUrl}
        message={loadingMessage}
      />
      <GenericModal isOpen={showUnavailable}>
        <Typography variant="h6">This model is not available</Typography>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={() => navigate('/')}
        >
          Go back to marketplace
        </Button>
      </GenericModal>
      <InstructionCard title="Purchase Model">
        <Box
          display="flex"
          justifyContent="center"
          flexDirection={{ xs: 'column', sm: 'row' }}
          position="relative"
        >
          <ModelCardContent item={modelDetails} hasLink={false} />
          <Box sx={{ marginLeft: { xs: '0', md: 'auto' } }}>
            <ModelCardMedia
              dapps={modelDetails.dapps}
              itemsShown={isXs ? 3 : 4}
            />
          </Box>
        </Box>
        <InstructionRow title="Connect Wallet to Indigo" number={1}>
          <WalletButton
            Icon={FaRegCheckCircle}
            size={25}
            sx={{ minWidth: buttonWidth }}
          />
        </InstructionRow>
        <InstructionRow title="Confirm transaction" number={2}>
          {hasReceipt ? (
            <StandardButton
              variant="contained"
              color="success"
              size="large"
              sx={{
                backgroundColor: theme.palette.success.dark,
                color: theme.palette.text.primary,
              }}
              disableElevation
            >
              <IconBox>
                <FaRegCheckCircle size={25} />{' '}
                <Typography fontWeight="bold">CONFIRMED</Typography>
              </IconBox>
            </StandardButton>
          ) : (
            <StandardButton
              variant="contained"
              color="warning"
              size="large"
              disableElevation
              disabled={!provider}
              onClick={() => handleTransaction(id)}
            >
              <IconBox>
                <FaRegHandshake size={25} />{' '}
                <Typography fontWeight="bold">CONFIRM</Typography>
              </IconBox>
            </StandardButton>
          )}
        </InstructionRow>
        <InstructionRow title="Retrieve model" number={3}>
          {model ? (
            <StandardButton
              variant="contained"
              color="success"
              size="large"
              sx={{
                backgroundColor: theme.palette.success.dark,
                color: theme.palette.text.primary,
              }}
              disableElevation
            >
              <IconBox>
                <FaRegCheckCircle size={25} />{' '}
                <Typography fontWeight="bold">REDEEMED</Typography>
              </IconBox>
            </StandardButton>
          ) : (
            <StandardButton
              variant="contained"
              color="warning"
              size="large"
              onClick={handleRedeem}
              disabled={!hasReceipt}
              disableElevation
            >
              <IconBox>
                <FaTicketAlt size={25} />{' '}
                <Typography fontWeight="bold">REDEEM</Typography>
              </IconBox>
            </StandardButton>
          )}
        </InstructionRow>
        <InstructionRow number={4} title="Download model">
          <StandardButton
            variant="contained"
            color="warning"
            disableElevation
            fullWidth
            disabled={!model}
            onClick={handleDownload}
            sx={{ paddingX: 4 }}
          >
            <IconBox>
              <BiDownload size={25} />
              <Typography paddingTop="1px" fontWeight="bold">
                DOWNLOAD
              </Typography>
            </IconBox>
          </StandardButton>
        </InstructionRow>
      </InstructionCard>
    </Layout>
  );
};

ModelPreview.propTypes = {
  modelDetails: PropTypes.object,
};

export default ModelPreview;
