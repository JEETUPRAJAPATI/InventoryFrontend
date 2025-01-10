import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  TextField,
  Typography,
  Box,
} from '@mui/material';
import { QRCodeSVG } from 'qrcode.react';
import toast from 'react-hot-toast';

// Dummy data to simulate QR code scan results
const dummyQRData = {
  rollSize: '15x20',
  gsm: '100',
  fabricColor: 'Green',
  bagType: 'W-Cut',
  printColor: 'Black',
  cylinderSize: '30x40'
};

export default function VerifyOrderDialog({ open, onClose, order, onVerifyComplete }) {
  const [scanning, setScanning] = useState(false);
  const [scannedData, setScannedData] = useState(null);

  const handleScan = () => {
    setScanning(true);
    // Simulate scanning delay
    setTimeout(() => {
      try {
        // Simulate successful scan by setting dummy data
        setScannedData(dummyQRData);
        toast.success('QR Code scanned successfully');
        setScanning(false);
      } catch (error) {
        toast.error('Invalid QR Code. Please try again.');
        setScanning(false);
      }
    }, 1500);
  };

  const handleConfirm = () => {
    if (scannedData) {
      onVerifyComplete(order.id, scannedData);
    }
  };

  const handleClose = () => {
    setScannedData(null);
    onClose();
  };

  if (!order) return null;

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>Verify Order - {order.orderId}</DialogTitle>
      <DialogContent>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" gutterBottom>
              Order Details
            </Typography>
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" color="text.secondary">
                Order ID: {order.orderId}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Job Name: {order.jobName}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Quantity: {order.quantity}
              </Typography>
            </Box>

            {/* <Typography variant="subtitle2" gutterBottom>
              Scan QR Code
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
              <QRCodeSVG
                value={JSON.stringify(dummyQRData)}
                size={200}
              />
            </Box> */}
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" gutterBottom>
              Scanned Details
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Roll Size"
                  value={scannedData?.rollSize || ''}
                  disabled
                  sx={{ backgroundColor: scannedData?.rollSize ? '#e8f5e9' : 'inherit' }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="GSM"
                  value={scannedData?.gsm || ''}
                  disabled
                  sx={{ backgroundColor: scannedData?.gsm ? '#e8f5e9' : 'inherit' }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Fabric Color"
                  value={scannedData?.fabricColor || ''}
                  disabled
                  sx={{ backgroundColor: scannedData?.fabricColor ? '#e8f5e9' : 'inherit' }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Bag Type"
                  value={scannedData?.bagType || ''}
                  disabled
                  sx={{ backgroundColor: scannedData?.bagType ? '#e8f5e9' : 'inherit' }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Print Color"
                  value={scannedData?.printColor || ''}
                  disabled
                  sx={{ backgroundColor: scannedData?.printColor ? '#e8f5e9' : 'inherit' }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Cylinder Size"
                  value={scannedData?.cylinderSize || ''}
                  disabled
                  sx={{ backgroundColor: scannedData?.cylinderSize ? '#e8f5e9' : 'inherit' }}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button
          variant="contained"
          onClick={handleScan}
          disabled={scanning}
        >
          {scanning ? 'Scanning...' : 'Scan QR Code'}
        </Button>
        {scannedData && (
          <Button
            variant="contained"
            color="success"
            onClick={handleConfirm}
          >
            Confirm & Start Job
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}