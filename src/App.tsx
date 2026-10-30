import { useState, type ChangeEvent, type FormEvent } from "react";

type FormValues = {
  name: string;
  email: string;
  phone: string;
  department: string;
  address: string;
};

const initialValues: FormValues = {
  name: "",
  email: "",
  phone: "",
  department: "",
  address: "",
};

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_EXTENSIONS = [".pdf", ".doc", ".docx"];

function App() {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState("");
  const [message, setMessage] = useState("");

  function handleChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
    setMessage("");
  }

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const selected = event.target.files?.[0] ?? null;
    setFileError("");
    setMessage("");

    if (!selected) {
      setFile(null);
      return;
    }

    const extension = selected.name.slice(selected.name.lastIndexOf(".")).toLowerCase();

    if (!ALLOWED_EXTENSIONS.includes(extension)) {
      setFile(null);
      setFileError("Choose a PDF, DOC or DOCX file.");
      event.target.value = "";
      return;
    }

    if (selected.size > MAX_FILE_SIZE) {
      setFile(null);
      setFileError("The document must be 5 MB or smaller.");
      event.target.value = "";
      return;
    }

    setFile(selected);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!file) {
      setFileError("Please upload a document before submitting.");
      return;
    }

    // Ready for a backend: send this FormData using fetch().
    const payload = new FormData();
    Object.entries(values).forEach(([key, value]) => payload.append(key, value));
    payload.append("document", file);

    console.log("Form values:", values);
    console.log("Uploaded document:", file);
    console.log("FormData prepared:", payload);

    setMessage("Form validated successfully. Open the browser console to see the submitted data.");
  }

  function handleReset() {
    setValues(initialValues);
    setFile(null);
    setFileError("");
    setMessage("");
  }

  return (
    <main className="page">
      <section className="form-card">
        <div className="eyebrow">GWFT PORTAL</div>
        <h1>Tool Information</h1>
        <p className="intro">Enter your details and attach a supporting document.</p>

        <form onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="name">Full name <span>*</span></label>
            <input id="name" name="name" value={values.name} onChange={handleChange}
              placeholder="Enter your full name" autoComplete="name" required />
          </div>

          <div className="field">
            <label htmlFor="email">Email address <span>*</span></label>
            <input id="email" name="email" type="email" value={values.email}
              onChange={handleChange} placeholder="you@example.com"
              autoComplete="email" required />
          </div>

          <div className="field">
            <label htmlFor="phone">Phone number <span>*</span></label>
            <input id="phone" name="phone" type="tel" value={values.phone}
              onChange={handleChange} placeholder="Enter phone number"
              autoComplete="tel" required />
          </div>

          <div className="field">
            <label htmlFor="department">Department <span>*</span></label>
            <select id="department" name="department" value={values.department}
              onChange={handleChange} required>
              <option value="">Select a department</option>
              <option value="IT">IT</option>
              <option value="HR">HR</option>
              <option value="Finance">Finance</option>
              <option value="Operations">Operations</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="field">
            <label htmlFor="address">Address <span>*</span></label>
            <textarea id="address" name="address" value={values.address}
              onChange={handleChange} placeholder="Enter your address"
              rows={3} autoComplete="street-address" required />
          </div>

          <div className="field upload-field">
            <label htmlFor="document">Upload document <span>*</span></label>
            <label className="upload-box" htmlFor="document">
              <span className="upload-icon" aria-hidden="true">↑</span>
              <strong>{file ? "Change document" : "Choose a document"}</strong>
              <span className="upload-hint">PDF, DOC or DOCX · Maximum 5 MB</span>
              <input id="document" type="file" accept=".pdf,.doc,.docx"
                onChange={handleFileChange} />
            </label>
            {file && <div className="file-selected">✓ {file.name} · {(file.size / 1024 / 1024).toFixed(2)} MB</div>}
            {fileError && <div className="error" role="alert">{fileError}</div>}
          </div>

          {message && <div className="success" role="status">{message}</div>}

          <div className="actions">
            <button className="secondary-button" type="button" onClick={handleReset}>Reset</button>
            <button className="primary-button" type="submit">Submit form</button>
          </div>
          <p className="required-note"><span>*</span> Required fields</p>
        </form>
      </section>
    </main>
  );
}

export default App;
