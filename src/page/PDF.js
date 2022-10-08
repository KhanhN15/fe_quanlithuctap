import { Viewer } from "@react-pdf-viewer/core"; // install this library
// Plugins
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout"; // install this library
// Import the styles
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
// Worker
import { Worker } from "@react-pdf-viewer/core"; // install this library
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import * as Config from "../API/Config";

const PDF = () => {
  const { id } = useParams();
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  const [product, setProduct] = useState("");

  useEffect(async () => {
    try {
      const res = await axios.get(
        `${Config.API_URL}/show-all-pdf-course/${id}`
      );
      if (res.status === 200) {
        setProduct(res.data.data);
      }
    } catch (error) {
      alert("error");
    }
  }, []);

  return (
    <>
      <div className="pdf-container">
        {/* show pdf conditionally (if we have one)  */}
        {product.file && (
          <>
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.14.305/build/pdf.worker.min.js">
              <Viewer
                fileUrl={product.file}
                plugins={[defaultLayoutPluginInstance]}
              />
            </Worker>
          </>
        )}

        {/* if we dont have pdf or viewPdf state is null */}
        {!product.file && <>No pdf file selected</>}
      </div>
    </>
  );
};

export default PDF;
