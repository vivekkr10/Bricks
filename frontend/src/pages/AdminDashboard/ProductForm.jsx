import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Save, UploadCloud } from "lucide-react";

const ProductForm = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const editId = searchParams.get("id");

  const isEditMode = Boolean(editId);

  const [previewImage, setPreviewImage] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    type: "",
    shortDesc: "",
    detailedDesc: "",
    specs: "",
    usage: "",
    status: "Active",
  });

  /* ===============================
     LOAD DATA IN EDIT MODE
     =============================== */
  useEffect(() => {
    if (isEditMode) {
      const saved =
        JSON.parse(localStorage.getItem("brick_products")) || [];

      const product = saved.find((p) => p.id === Number(editId));

      if (product) {
        setFormData({
          name: product.name || "",
          type: product.type || "",
          shortDesc: product.shortDesc || "",
          detailedDesc: product.detailedDesc || "",
          specs: product.specs || "",
          usage: product.usage || "",
          status: product.status || "Active",
        });

        setPreviewImage(product.image || null);
      }
    }
  }, [editId, isEditMode]);

  /* ===============================
     INPUT CHANGE
     =============================== */
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  /* ===============================
     IMAGE CHANGE
     =============================== */
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  /* ===============================
     SUBMIT HANDLER
     =============================== */
  const handleSubmit = (e) => {
    e.preventDefault();

    const saved =
      JSON.parse(localStorage.getItem("brick_products")) || [];

    let updatedProducts;

    if (isEditMode) {
      updatedProducts = saved.map((p) =>
        p.id === Number(editId)
          ? { ...p, ...formData, image: previewImage }
          : p
      );
    } else {
      updatedProducts = [
        ...saved,
        {
          ...formData,
          id: Date.now(),
          image: previewImage,
        },
      ];
    }

    localStorage.setItem(
      "brick_products",
      JSON.stringify(updatedProducts)
    );

    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-10">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl p-10 shadow-sm">
        {/* HEADER */}
        <h1 className="text-2xl font-bold mb-1">
          {isEditMode ? "Edit Product" : "Add New Product"}
        </h1>
        <p className="text-gray-500 mb-8">
          {isEditMode
            ? "Update product information"
            : "Fill in the details to add a new brick product"}
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* PRODUCT NAME + TYPE */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block mb-1 text-sm font-medium">
                Product Name
              </label>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter product name"
                className="w-full p-4 bg-gray-100 rounded-lg"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium">
                Product Type
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full p-4 bg-gray-100 rounded-lg"
              >
                <option value="">Select product type</option>
                <option>Fly Ash Brick</option>
                <option>Clay Brick</option>
                <option>Concrete Block</option>
                <option>AAC Block</option>
                <option>Paver Block</option>
                <option>Hollow Brick</option>
                <option>Solid Brick</option>
              </select>
            </div>
          </div>

          {/* SHORT DESC */}
          <div>
            <label className="block mb-1 text-sm font-medium">
              Short Description
            </label>
            <input
              name="shortDesc"
              value={formData.shortDesc}
              onChange={handleChange}
              placeholder="Enter short description"
              className="w-full p-4 bg-gray-100 rounded-lg"
            />
          </div>

          {/* DETAILED DESC */}
          <div>
            <label className="block mb-1 text-sm font-medium">
              Detailed Description
            </label>
            <textarea
              name="detailedDesc"
              value={formData.detailedDesc}
              onChange={handleChange}
              placeholder="Enter detailed description"
              rows="4"
              className="w-full p-4 bg-gray-100 rounded-lg"
            />
          </div>

          {/* SPECS */}
          <div>
            <label className="block mb-1 text-sm font-medium">
              Specifications
            </label>
            <input
              name="specs"
              value={formData.specs}
              onChange={handleChange}
              placeholder="Example: Size, strength, weight"
              className="w-full p-4 bg-gray-100 rounded-lg"
            />
          </div>

          {/* USAGE */}
          <div>
            <label className="block mb-1 text-sm font-medium">
              Usage Area
            </label>
            <input
              name="usage"
              value={formData.usage}
              onChange={handleChange}
              placeholder="Example: Residential, Commercial"
              className="w-full p-4 bg-gray-100 rounded-lg"
            />
          </div>

          {/* STATUS */}
          <div>
            <label className="block mb-1 text-sm font-medium">
              Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full p-4 bg-gray-100 rounded-lg"
            >
              <option>Active</option>
              <option>Inactive</option>
            </select>
          </div>

          {/* IMAGE UPLOAD */}
          <div className="border-2 border-dashed rounded-xl p-6 text-center bg-gray-50">
            {previewImage ? (
              <img
                src={previewImage}
                alt="preview"
                className="h-40 mx-auto rounded-lg object-contain mb-4"
              />
            ) : (
              <UploadCloud className="mx-auto text-gray-400 mb-2" />
            )}

            <label className="cursor-pointer text-sm font-semibold text-gray-600">
              {previewImage ? "Change Image" : "Upload Product Image"}
              <input type="file" hidden onChange={handleImageChange} />
            </label>
          </div>

          {/* BUTTONS */}
          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              className="flex-1 bg-black text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2"
            >
              <Save size={18} />
              {isEditMode ? "Update Product" : "Add Product"}
            </button>

            <button
              type="button"
              onClick={() => navigate("/dashboard")}
              className="flex-1 border rounded-lg py-3 font-semibold"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;
