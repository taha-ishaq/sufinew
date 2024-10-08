import React, { useEffect, useState } from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  CardMedia,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Chip,
} from '@mui/material';
import axios from 'axios';

const tagOptions = [
  { value: 'woman', label: 'Woman' },
  { value: 'man', label: 'Man' },
  { value: 'bridal', label: 'Bridal' },
  { value: 'partywear', label: 'Party Wear' },
  { value: 'stitch', label: 'Stitch' },
  { value: 'unstitch', label: 'Unstitch' },
  { value: 'woman,stitch', label: 'Woman,Stitch' },
];

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingProduct, setEditingProduct] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://sufilatestbe.vercel.app/v2/products/');
        setProducts(response.data);
      } catch (err) {
        setError('Failed to load products.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://sufilatestbe.vercel.app/v2/products/${id}`);
      setProducts(products.filter(product => product._id !== id));
    } catch (err) {
      setError('Failed to delete product.');
      console.error(err);
    }
  };

  const handleEditOpen = (product) => {
    setEditingProduct(product);
    setOpen(true);
  };

  const handleEditClose = () => {
    setOpen(false);
    setEditingProduct(null);
  };

  const handleSave = async () => {
    try {
      await axios.put(`https://sufilatestbe.vercel.app/v2/products/${editingProduct._id}`, editingProduct);
      setProducts(products.map(product => (product._id === editingProduct._id ? editingProduct : product)));
      handleEditClose();
    } catch (err) {
      setError('Failed to update product.');
      console.error(err);
    }
  };

  const handleTagChange = (event) => {
    const value = event.target.value;
    setEditingProduct({ ...editingProduct, tags: value });
  };

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <>
      <Grid container spacing={2}>
        {products.map(product => (
          <Grid item xs={12} sm={6} md={4} key={product._id}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image={product.mainImage}
                alt={product.name}
              />
              <CardContent>
                <Typography variant="h5">{product.name}</Typography>
                <Typography variant="body2" color="textSecondary">
                  Price: ${product.price}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Stock: {product.stock}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Colors: {Array.isArray(product.colors) ? product.colors.join(', ') : 'N/A'}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Description: {product.description || 'N/A'}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Details: {Array.isArray(product.details) ? product.details.join(', ') : 'N/A'}
                </Typography>
                <Button variant="contained" color="primary" onClick={() => handleEditOpen(product)} style={{ marginTop: '10px' }}>
                  Edit
                </Button>
                <Button variant="contained" color="secondary" onClick={() => handleDelete(product._id)} style={{ marginLeft: '10px', marginTop: '10px' }}>
                  Delete
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Edit Dialog */}
      <Dialog open={open} onClose={handleEditClose}>
        <DialogTitle>Edit Product</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            fullWidth
            value={editingProduct?.name || ''}
            onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Price"
            fullWidth
            type="number"
            value={editingProduct?.price || ''}
            onChange={(e) => setEditingProduct({ ...editingProduct, price: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Stock"
            fullWidth
            type="number"
            value={editingProduct?.stock || ''}
            onChange={(e) => setEditingProduct({ ...editingProduct, stock: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Description"
            fullWidth
            value={editingProduct?.description || ''}
            onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
          />
          {/* Tag Selection */}
          <FormControl fullWidth margin="dense">
            <InputLabel>Tags</InputLabel>
            <Select
              multiple
              value={editingProduct?.tags || []}
              onChange={handleTagChange}
              renderValue={(selected) => (
                <div>
                  {selected.map((value) => (
                    <Chip key={value} label={tagOptions.find(tag => tag.value === value)?.label} />
                  ))}
                </div>
              )}
            >
              {tagOptions.map((tag) => (
                <MenuItem key={tag.value} value={tag.value}>
                  {tag.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ProductManagement;
