import React, { useState, useContext, useRef } from 'react';
import Layout from 'layout';
import { saveAs } from 'file-saver';
import { AppContext } from 'context/AppContext';
import { WalletButton, LoadingModal } from 'components';
import { ModelCardMedia, ModelCardContent } from 'components/ModelCard';
import useMediaQuery from '@mui/material/useMediaQuery';
import mockGraphData from 'utils/mockGraphData.json';
import {
  Typography,
  Box,
  useTheme,
  CardContent,
  Button,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { FaRegHandshake, FaRegCheckCircle, FaTicketAlt } from 'react-icons/fa';
import { BiDownload } from 'react-icons/bi';
import AirtableIcon from 'svg/illustrations/Airtable';
import { useContract } from 'hooks';
import { blockExplorerUrl } from 'utils/constants';
import {
  InstructionCard,
  InstructionRow,
  SpacedBox,
  SpacedDivider,
} from 'components/InstructionCard';

const mockData = {
  title: 'Aurora + Curve',
  dapps: ['sushiswap', 'twitter', 'curve', 'chainlink', 'near'],
  author: 'Nick Fury',
  description:
    'locavore tbh health goth street art tumblr 3 wolf moon single-origin coffee vexillologist +1 skateboard taxidermy copper mug master cleanse hexagon kitsch.',
  price: 7,
  id: 4,
};

const IconBox = styled(Box)`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const ModelPreview = () => {
  const interval = useRef();
  const theme = useTheme();
  const { provider, userAddress } = useContext(AppContext);
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [hasReceipt, setHasReceipt] = useState();
  const [model, setModel] = useState();
  const { getModelData, getReceipt } = useContract(provider, userAddress);
  const isXs = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  const isSm = useMediaQuery((theme) => theme.breakpoints.down('md'));
  const modelDetails = mockData;

  function handleTransaction(id) {
    // consider breaking this out into two parts in case user loses connection/refreshes between minting
    // nft and calling getModelData. also consider searching account for nft to skip straight
    // to getting model data

    // mintNFTReceipt
    console.log('mintNFTReceipt', id);

    // start polling getReceipt to see if db-node is ready to receive
    // pop loading modal until complete
    setIsLoading(true);
    pollReceipt(id);
  }

  function pollReceipt(receiptId) {
    clearInterval(interval.current); // clean up any old timers
    interval.current = setInterval(async () => {
      let receipt;
      try {
        receipt = await getReceipt(receiptId);
      } catch (e) {
        setIsLoading(false);
        console.log('failure');
      }

      receipt = receiptId;
      if (receipt) {
        setIsLoading(false);
        setHasReceipt(receipt);
        clearInterval(interval.current);
      }
    }, 1000);
  }

  async function handleRedeem() {
    // call getModelData
    setIsLoading(true);
    let modelData = await getModelData(id, userAddress);
    modelData = mockGraphData;

    setModel(modelData);
    setIsLoading(false);
  }

  // saving data annoyingly refreshes the page when using
  // webpack dev hot reloading. does not refresh on test or prod
  function handleDownload(e) {
    var blob = new Blob([JSON.stringify(model)], {
      type: 'text/json;charset=utf-8',
    });
    saveAs(blob, 'data.json');

    e.preventDefault();
    e.stopPropagation();
    return false;
  }

  console.log('isLoading', isLoading);
  return (
    <Layout hideImage noGradient>
      <LoadingModal
        isLoading={isLoading}
        message="Confirming transaction"
        href={`${blockExplorerUrl}/tx/${'0x433b1c1e500036910f13a4d8e03ce8c29fc3cd8804d80724f4dff0add840933f'}`}
      />
      <InstructionCard>
        <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }}>
          <ModelCardContent item={modelDetails} hasLink={false} />
          <ModelCardMedia
            dapps={modelDetails.dapps}
            itemsShown={isXs ? 3 : 4}
          />
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
              onClick={() => {
                // open tabs to aurora etherscan
                console.log('TO ETHERSCAN!');
              }}
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
              onClick={() => {
                // open tabs to aurora etherscan
                console.log('TO ETHERSCAN!');
              }}
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
        <SpacedDivider />
        <CardContent>
          <SpacedBox>
            <Typography fontWeight="bold" variant="h2">
              4
            </Typography>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              width="100%"
              gap="10%"
            >
              <Button
                variant="contained"
                color="primary"
                disableElevation
                fullWidth
                disabled={!model}
                onClick={handleDownload}
              >
                <IconBox>
                  <BiDownload size={25} />
                  <Typography paddingTop="1px" fontWeight="bold">
                    DOWNLOAD
                  </Typography>
                </IconBox>
              </Button>
              <Typography variant="body">OR</Typography>
              <Button
                variant="contained"
                color="primary"
                disableElevation
                fullWidth
                disabled={!model}
              >
                <IconBox>
                  <Typography paddingTop="1px" fontWeight="bold">
                    SEND TO
                    {isSm && ' AIRTABLE'}
                  </Typography>
                  {!isSm && <AirtableIcon size="110px" disabled={!model} />}
                </IconBox>
              </Button>
            </Box>
          </SpacedBox>
        </CardContent>
      </InstructionCard>
    </Layout>
  );
};

ModelPreview.propTypes = {
  modelData: PropTypes.object,
};

export default ModelPreview;
