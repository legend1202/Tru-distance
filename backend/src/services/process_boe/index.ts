import fs from 'fs';
import axios from 'axios';
import FormData from 'form-data';
import { handleProposalDetails } from './proposal';
import { saveFilepath } from '../process_pdf/file_save';
import { handleWbsDetails } from './wbs';

const API_URL = 'https://boe-scrapping.onrender.com/process-pdf';

// Main function to extract and save data
export const processBoeModule = async (pdfPath: string) => {
  try {
    // Ensure the file exists before proceeding
    if (!fs.existsSync(pdfPath)) {
      throw new Error(`File not found: ${pdfPath}`);
    }

    // Create a form and append the PDF file
    const form = new FormData();
    form.append('file', fs.createReadStream(pdfPath));

    // Configure headers (form-data will set content-type automatically)
    const config = {
      headers: {
        ...form.getHeaders(), // Attach headers for form-data
      },
    };

    // Send POST request
    const response = await axios.post(API_URL, form, config);

    // Log the response
    if (response.data.proposalName) {
      const proposal = await handleProposalDetails(response.data.proposalName);
      await saveFilepath(proposal.id, pdfPath, 0);
      await handleWbsDetails(response.data.WBS, proposal.id);
    }
    return response.data; // Optionally return data for further processing
  } catch (error) {
    console.error('Error processing PDF file:', error);
    if (axios.isAxiosError(error) && error.response) {
      console.error('Response Error:', error.response.data);
    }
  }
};
