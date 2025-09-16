import { NextResponse } from 'next/server';
import cloudinary from '@/lib/cloudinary.config';

export async function GET() {
  try {
    const timestamp = Math.round(new Date().getTime() / 1000);

    // Define options (folder, resource_type for PDF, etc.)
    const params = {
      timestamp,
      folder: 'resumes',
      //   resource_type: 'raw', // for PDFs
    };

    // Generate signature
    const signature = cloudinary.utils.api_sign_request(
      params,
      process.env.CLOUDINARY_CLOUD_API_SECRET!
    );

    return NextResponse.json({
      ...params,
      signature,
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_CLOUD_API_KEY,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to generate signature' },
      { status: 500 }
    );
  }
}
