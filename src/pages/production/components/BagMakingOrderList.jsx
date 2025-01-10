import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Chip,
  Card,
  Box,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { Update, CheckCircle, LocalShipping, QrCodeScanner, Receipt } from '@mui/icons-material';
import toast from 'react-hot-toast';
import { useState } from 'react';
import VerifyOrderDialog from './VerifyOrderDialog';

const mockOrders = [
  {
    id: 'BAG-001',
    order_id: 'ORD-001',
    job_name: 'Premium D-Cut Bags',
    role_size: '12x15',
    bag_type: 'D-Cut',
    bag_color: 'Blue',
    bag_size: '12x15x4',
    gsm: '90',
    quantity: 1000,
    weight: '500',
    qnt: '100',
    status: 'pending'
  },
  {
    id: 'BAG-002',
    order_id: 'ORD-002',
    job_name: 'Eco D-Cut Bags',
    role_size: '10x12',
    bag_type: 'D-Cut',
    bag_color: 'Green',
    bag_size: '10x12x3',
    gsm: '80',
    quantity: 2000,
    weight: '800',
    qnt: '150',
    status: 'in_progress'
  },
  {
    id: 'BAG-003',
    order_id: 'ORD-003',
    job_name: 'Luxury D-Cut Bags',
    role_size: '15x20',
    bag_type: 'D-Cut',
    bag_color: 'Black',
    bag_size: '15x20x5',
    gsm: '100',
    quantity: 3000,
    weight: '900',
    qnt: '200',
    status: 'completed',
    billingStatus: 'pending'
  }
];

export default function BagMakingOrderList({ status, bagType }) {
  const [verifyDialogOpen, setVerifyDialogOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orders, setOrders] = useState(mockOrders);
  const [confirmBillingOpen, setConfirmBillingOpen] = useState(false);
  const [orderToBill, setOrderToBill] = useState(null);

  const getStatusColor = (status) => {
    const colors = {
      pending: 'warning',
      in_progress: 'info',
      completed: 'success'
    };
    return colors[status] || 'default';
  };

  const handleVerify = (order) => {
    if (orders.some(o => o.status === 'in_progress') && order.status === 'pending') {
      toast.error('A job is already active. Please complete or deactivate it before starting a new one.');
      return;
    }
    setSelectedOrder(order);
    setVerifyDialogOpen(true);
  };

  const handleVerifyComplete = (orderId, verifiedData) => {
    setOrders(prevOrders =>
      prevOrders.map(order =>
        order.id === orderId
          ? {
            ...order,
            ...verifiedData,
            status: 'in_progress'
          }
          : order
      )
    );
    setVerifyDialogOpen(false);
    setSelectedOrder(null);
    toast.success('Order verified and marked as active');
  };

  const handleUpdateStatus = (orderId) => {
    if (orders.some(o => o.status === 'in_progress') && status === 'pending') {
      toast.error('A job is already active. Please complete it first.');
      return;
    }
    toast.success('Order moved to Bag Making Process');
  };

  const handleCompleteOrder = (orderId) => {
    setOrders(prevOrders =>
      prevOrders.map(order =>
        order.id === orderId
          ? { ...order, status: 'completed', billingStatus: 'pending' }
          : order
      )
    );
    toast.success('This bag making process has completed');
  };

  const handleMoveToDelivery = (orderId) => {
    toast.success('Order moved to Packaging & Delivery section');
  };

  const handleBillingClick = (order) => {
    setOrderToBill(order);
    setConfirmBillingOpen(true);
  };

  const handleConfirmBilling = () => {
    setOrders(prevOrders =>
      prevOrders.map(order =>
        order.id === orderToBill.id
          ? { ...order, billingStatus: 'completed' }
          : order
      )
    );
    setConfirmBillingOpen(false);
    setOrderToBill(null);
    toast.success('Order moved to billing successfully');
  };

  const filteredOrders = orders.filter(order => order.status === status);

  return (
    <Box>
      <Card>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Role Size</TableCell>
                <TableCell>Order ID</TableCell>
                <TableCell>Job Name</TableCell>
                <TableCell>Bag Type</TableCell>
                <TableCell>Bag Color</TableCell>
                <TableCell>Bag Size</TableCell>
                <TableCell>GSM</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Weight</TableCell>
                <TableCell>QNT</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>{order.role_size}</TableCell>
                  <TableCell>{order.order_id}</TableCell>
                  <TableCell>{order.job_name}</TableCell>
                  <TableCell>{order.bag_type}</TableCell>
                  <TableCell>{order.bag_color}</TableCell>
                  <TableCell>{order.bag_size}</TableCell>
                  <TableCell>{order.gsm}</TableCell>
                  <TableCell>{order.quantity}</TableCell>
                  <TableCell>{order.weight}</TableCell>
                  <TableCell>{order.qnt}</TableCell>
                  <TableCell>
                    <Chip
                      label={order.status.replace('_', ' ').toUpperCase()}
                      color={getStatusColor(order.status)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    {order.status === 'pending' && (
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Button
                          startIcon={<Update />}
                          variant="contained"
                          color="primary"
                          size="small"
                          onClick={() => handleUpdateStatus(order.id)}
                        >
                          Move to Bag Making Process
                        </Button>
                        {bagType === 'dcut' && (
                          <Button
                            startIcon={<QrCodeScanner />}
                            variant="outlined"
                            size="small"
                            onClick={() => handleVerify(order)}
                          >
                            Verify
                          </Button>
                        )}
                      </Box>
                    )}
                    {order.status === 'in_progress' && (
                      <Button
                        startIcon={<CheckCircle />}
                        variant="contained"
                        color="success"
                        size="small"
                        onClick={() => handleCompleteOrder(order.id)}
                      >
                        Work Completed
                      </Button>
                    )}
                    {order.status === 'completed' && (
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Button
                          startIcon={<Receipt />}
                          variant="contained"
                          color="secondary"
                          size="small"
                          onClick={() => handleBillingClick(order)}
                        >
                          Direct Billing
                        </Button>

                        <Button
                          startIcon={<LocalShipping />}
                          variant="contained"
                          color="primary"
                          size="small"
                          onClick={() => handleMoveToBagMaking(order.id)}
                        >
                          Move to Bag Making
                        </Button>
                      </Box>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

      <VerifyOrderDialog
        open={verifyDialogOpen}
        onClose={() => setVerifyDialogOpen(false)}
        order={selectedOrder}
        onVerifyComplete={handleVerifyComplete}
      />

      <Dialog
        open={confirmBillingOpen}
        onClose={() => setConfirmBillingOpen(false)}
      >
        <DialogTitle>Confirm Direct Billing</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to move this order to billing?
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Order ID: {orderToBill?.order_id}<br />
            Job Name: {orderToBill?.job_name}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmBillingOpen(false)}>Cancel</Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleConfirmBilling}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}