import React, { useState, useContext, useEffect } from 'react';
import Layout from 'layout';
import { saveAs } from 'file-saver';
import { AppContext } from 'context/AppContext';
import { WalletButton, LoadingModal } from 'components';
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

const IconBox = styled(Box)`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const ModelPreview = () => {
  const theme = useTheme();
  const { provider, signer, userAddress } = useContext(AppContext);
  const { getSingleModelDescription, purchaseModel } = useContract(signer);
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [hasReceipt, setHasReceipt] = useState();
  const [model, setModel] = useState();
  const { getData, getReceipt } = useContract(provider, userAddress);
  const isXs = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  const [txUrl, setTxUrl] = useState('');
  const [modelDetails, setModelDetails] = useState({
    modelName: '',
    dapps: [],
    description: '',
    url: '',
  });

  useEffect(() => {
    (async () => {
      try {
        const modelDetails = await getSingleModelDescription(id);
        setModelDetails(modelDetails);
      } catch (e) {
        console.error(e);
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
      console.log('in try');
      const purchase = await purchaseModel(id);
      setTxUrl(getTransactionUrl(purchase.hash));
      await purchase.wait();

      setHasReceipt(true);
      setIsLoading(false);
    } catch (e) {
      console.error(e);
      setIsLoading(false);
    }
  }

  async function handleRedeem() {
    setIsLoading(true);
    try {
      let receipt = await getReceipt(id);
      if (receipt) {
        let modelData = await getData(modelDetails.url, id, 'receipt');
        console.log(modelData);
        modelData = mockGraphData;

        setModel(modelData);
        setIsLoading(false);
      }
    } catch (e) {
      console.error(e);
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
        message="Confirming transaction"
      />
      <InstructionCard>
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
          <WalletButton Icon={FaRegCheckCircle} size={25} />
        </InstructionRow>
        <InstructionRow title="Confirm transaction" number={2}>
          {hasReceipt ? (
            <Button
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
            </Button>
          ) : (
            <Button
              variant="contained"
              color="primary"
              size="large"
              disableElevation
              disabled={!provider}
              onClick={() => handleTransaction(id)}
            >
              <IconBox>
                <FaRegHandshake size={25} />{' '}
                <Typography fontWeight="bold">CONFIRM</Typography>
              </IconBox>
            </Button>
          )}
        </InstructionRow>
        <InstructionRow title="Retrieve model" number={3}>
          {model ? (
            <Button
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
            </Button>
          ) : (
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={handleRedeem}
              disabled={!hasReceipt}
              disableElevation
            >
              <IconBox>
                <FaTicketAlt size={25} />{' '}
                <Typography fontWeight="bold">REDEEM</Typography>
              </IconBox>
            </Button>
          )}
        </InstructionRow>
        <InstructionRow number={4} title="Download model">
          <Button
            variant="contained"
            color="primary"
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
          </Button>
        </InstructionRow>
      </InstructionCard>
    </Layout>
  );
};

ModelPreview.propTypes = {
  modelDetails: PropTypes.object,
};

export default ModelPreview;
