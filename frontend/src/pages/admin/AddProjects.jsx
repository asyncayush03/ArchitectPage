import React, { useState } from "react";
import { ArrowLeft, Plus, Upload, Trash2, Image as ImageIcon } from "lucide-react";
import axios from "axios";

export default function AddProjects() {
  const [project, setProject] = useState({
    name: "",
    client: "",
    type: "",
    budget: "",
    startDate: "",
    status: "",
    description: "",
  });

  const [images, setImages] = useState([]);

  // Handle Image Upload
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);

    const updated = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      caption: ""
    }));

    setImages((prev) => [...prev, ...updated]);
  };

  // Handle caption update
  const updateCaption = (index, value) => {
    const updated = [...images];
    updated[index].caption = value;
    setImages(updated);
  };

  // Remove selected image
  const deleteImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  // Submit Project
  const submitProject = async (e) => {
    e.preventDefault();

    const form = new FormData();

    // append project fields
    Object.keys(project).forEach((key) => {
      form.append(key, project[key]);
    });

    // append images + captions
    images.forEach((img) => {
      form.append("images", img.file);
      form.append("captions", img.caption);
    });

    try {
      const res = await axios.post("/api/v1/admin/project", form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Project added successfully!");
      console.log("Project Added:", res.data);

    } catch (error) {
      console.error("Error adding project:", error.response?.data || error);
      alert("Error adding project");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-stone-50 to-neutral-100 pb-16">

      {/* Page Header */}
      <div className="relative h-52 bg-gradient-to-r from-emerald-700 to-teal-600 text-white mb-10">
        <div className="max-w-6xl mx-auto h-full flex items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <button className="p-3 bg-white/20 rounded-xl">
              <ArrowLeft />
            </button>
            <div>
              <h1 className="text-4xl font-bold">Add New Project</h1>
              <p className="text-emerald-100">Enter project details below</p>
            </div>
          </div>
          <ImageIcon className="w-20 h-20 opacity-40" />
        </div>
      </div>

      {/* Form Card */}
      <div className="max-w-5xl mx-auto bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
        <h2 className="text-2xl font-bold text-stone-800 mb-6">Project Information</h2>

        <form className="space-y-6" onSubmit={submitProject}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Name */}
            <div>
              <label className="text-sm text-stone-600">Project Name</label>
              <input
                type="text"
                className="w-full mt-1 px-4 py-3 border rounded-xl focus:ring focus:ring-emerald-300"
                value={project.name}
                onChange={(e) => setProject({ ...project, name: e.target.value })}
                required
              />
            </div>

            {/* Client */}
            <div>
              <label className="text-sm text-stone-600">Client Name</label>
              <input
                type="text"
                className="w-full mt-1 px-4 py-3 border rounded-xl"
                value={project.client}
                onChange={(e) => setProject({ ...project, client: e.target.value })}
                required
              />
            </div>

            {/* Type */}
            <div>
              <label className="text-sm text-stone-600">Type</label>
              <input
                type="text"
                className="w-full mt-1 px-4 py-3 border rounded-xl"
                value={project.type}
                onChange={(e) => setProject({ ...project, type: e.target.value })}
                required
              />
            </div>

            {/* Budget */}
            <div>
              <label className="text-sm text-stone-600">Budget</label>
              <input
                type="text"
                className="w-full mt-1 px-4 py-3 border rounded-xl"
                value={project.budget}
                onChange={(e) => setProject({ ...project, budget: e.target.value })}
                required
              />
            </div>

            {/* Start Date */}
            <div>
              <label className="text-sm text-stone-600">Start Date</label>
              <input
                type="date"
                className="w-full mt-1 px-4 py-3 border rounded-xl"
                value={project.startDate}
                onChange={(e) => setProject({ ...project, startDate: e.target.value })}
                required
              />
            </div>

            {/* Status */}
            <div>
              <label className="text-sm text-stone-600">Status</label>
              <select
                className="w-full mt-1 px-4 py-3 border rounded-xl"
                value={project.status}
                onChange={(e) => setProject({ ...project, status: e.target.value })}
                required
              >
                <option value="">Select</option>
                <option value="Planning">Planning</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="text-sm text-stone-600">Description</label>
            <textarea
              rows={6}
              className="w-full mt-1 px-4 py-3 border rounded-xl"
              value={project.description}
              onChange={(e) => setProject({ ...project, description: e.target.value })}
              required
            ></textarea>
          </div>

          {/* Image Upload */}
          <div>
            <label className="text-sm text-stone-600 block mb-2">Project Images</label>

            <label className="block w-full py-8 border-2 border-dashed rounded-xl text-center cursor-pointer bg-stone-50">
              <Upload className="mx-auto w-10 h-10 text-stone-400" />
              <p className="text-stone-500 mt-2">Click to upload images</p>
              <input
                type="file"
                multiple
                className="hidden"
                accept="image/*"
                onChange={handleImageUpload}
              />
            </label>

            {/* Image Preview Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
              {images.map((img, index) => (
                <div key={index} className="relative bg-white border rounded-xl shadow p-3">
                  <img
                    src={img.preview}
                    alt="preview"
                    className="w-full h-40 object-cover rounded-lg mb-3"
                  />

                  <input
                    type="text"
                    placeholder="Caption..."
                    className="w-full px-3 py-2 border rounded-lg text-sm"
                    value={img.caption}
                    onChange={(e) => updateCaption(index, e.target.value)}
                  />

                  <button
                    onClick={() => deleteImage(index)}
                    type="button"
                    className="absolute top-2 right-2 p-2 bg-red-100 text-red-600 rounded-full"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <button className="mt-6 w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-semibold text-lg shadow">
            Save Project
          </button>
        </form>
      </div>
    </div>
  );
}
