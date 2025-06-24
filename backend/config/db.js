import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://hattorin454:Abvk1810@cluster0.t9x7t.mongodb.net/Food-Del?retryWrites=true&w=majority&appName=Cluster0");
        console.log('DB Connected');
    } catch (error) {
        console.error('DB Connection Error:', error);
    }
};
