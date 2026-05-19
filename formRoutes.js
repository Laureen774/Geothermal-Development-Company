export async function GET() {
    return NextResponse.json({ message: 'Route is working' });
}
import {NextResponse} from 'next/server';
import mongoose from 'mongoose';

export async function POST(request) {
    try {
        console.log('Received form submission');
        const data = await request.json();
        console.log('Form data:', data);
        
        if (!process.env.MONGODB_URI) {
            return NextResponse.json({ message: 'MongoDB URI not configured' }, { status: 500 });
        }
        console.log('Connecting to MongoDB...');
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connected to MongoDB');

        return NextResponse.json({ message: 'Form submitted successfully' });
    } catch (error) {
        console.error('Error handling form submission:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}



