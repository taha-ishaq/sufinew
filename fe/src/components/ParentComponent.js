const ParentComponent = () => {
    const handleEdit = (id) => {
      // Logic to handle editing a product
      console.log("Edit product with id:", id);
    };
  
    return <ProductList onEdit={handleEdit} />;
  };
  