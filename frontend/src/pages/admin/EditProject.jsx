import React, { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function EditProject() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    client: "",
    type: "",
    budget: "",
    status: "",
    description: "",
    startDate: "",
    progress: "",
  });

  const [loading, setLoading] = useState(true);

  // Fetch project details
  useEffect(() => {
    const loadProject = async () => {
      try {
        const res = await axios.get(`/api/v1/admin/project/${id}`);
        setForm(res.data.project);
        setLoading(false);
      } catch (err) {
        alert("Failed to load project");
        navigate("/admin/projects");
      }
    };

    loadProject();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/v1/admin/project/${id}`, form);
      alert("Project updated successfully!");
      navigate("/admin/projects");
    } catch (error) {
      console.error(error);
      alert("Failed to update project");
    }
  };

  if (loading) return <p className="p-10">Loading...</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-neutral-100 p-6">

      <div className="max-w-3xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 mb-6 text-emerald-600 hover:text-emerald-700"
        >
          <ArrowLeft className="w-5 h-5" /> Back
        </button>

        <div className="bg-white p-8 rounded-2xl shadow-lg border border-stone-200">
          <h2 className="text-3xl font-bold mb-6 text-stone-800">Edit Project</h2>

          <form onSubmit={submitHandler} className="grid grid-cols-1 gap-6">

            <div>
              <label className="text-sm text-stone-600">Project Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full mt-1 p-3 border rounded-xl"
                required
              />
            </div>

            <div>
              <label className="text-sm text-stone-600">Client Name</label>
              <input
                type="text"
                name="client"
                value={form.client}
                onChange={handleChange}
                className="w-full mt-1 p-3 border rounded-xl"
              />
            </div>

            <div>
              <label className="text-sm text-stone-600">Project Type</label>
              <input
                type="text"
                name="type"
                value={form.type}
                onChange={handleChange}
                className="w-full mt-1 p-3 border rounded-xl"
              />
            </div>

            <div>
              <label className="text-sm text-stone-600">Budget</label>
              <input
                type="number"
                name="budget"
                value={form.budget}
                onChange={handleChange}
                className="w-full mt-1 p-3 border rounded-xl"
              />
            </div>

            <div>
              <label className="text-sm text-stone-600">Status</label>
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className="w-full mt-1 p-3 border rounded-xl"
              >
                <option>Planning</option>
                <option>In Progress</option>
                <option>Completed</option>
              </select>
            </div>

            <div>
              <label className="text-sm text-stone-600">Description</label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows="4"
                className="w-full mt-1 p-3 border rounded-xl"
              ></textarea>
            </div>

            <div>
              <label className="text-sm text-stone-600">Start Date</label>
              <input
                type="date"
                name="startDate"
                value={form.startDate}
                onChange={handleChange}
                className="w-full mt-1 p-3 border rounded-xl"
              />
            </div>

            <div>
              <label className="text-sm text-stone-600">Progress (%)</label>
              <input
                type="number"
                name="progress"
                value={form.progress}
                onChange={handleChange}
                className="w-full mt-1 p-3 border rounded-xl"
              />
            </div>

            <button
              type="submit"
              className="bg-emerald-600 text-white py-3 rounded-xl text-lg hover:bg-emerald-700 transition"
            >
              Update Project
            </button>

          </form>
        </div>
      </div>
    </div>
  );
}
