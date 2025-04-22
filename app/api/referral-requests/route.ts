import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    // Parse the request body
    const body = await req.json();
    
    // Validate required fields
    if (!body.linkedinUrl || !body.email || !body.tags || body.tags.length === 0) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // In a real application, you would:
    // 1. Store the data in your database
    // 2. Send notifications/emails
    // 3. Integrate with any other services
    
    console.log('Received referral request:', body);
    
    // For demonstration purposes, we're just returning success
    return NextResponse.json({ 
      success: true,
      message: 'Referral request submitted successfully',
      requestId: `req_${Date.now()}`, // In a real app, this would be a DB-generated ID
    });
    
  } catch (error) {
    console.error('Error processing referral request:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
} 