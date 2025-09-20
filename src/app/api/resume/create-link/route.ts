import { NextResponse } from 'next/server';
import cloudinary from '@/lib/cloudinary.config';
import { getUser } from '@/data/user';

export async function GET() {
  try {
    await getUser();
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
      success: true,
      message: 'Created link successfully',
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      message: error.message || 'Failed to create link',
    });
  }
}
