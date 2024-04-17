import prisma from "../src/utils/prisma";
import axios from "axios";
import 'dotenv/config';

const main = async () => {
    try {
        const studentData = await axios.get(`https://api.mockaroo.com/api/f5679b70?count=1000&key=${process.env.MOCKAROO_KEY} `);
        const eventData = await axios.get(`https://api.mockaroo.com/api/2f3c7e30?count=200&key=${process.env.MOCKAROO_KEY}`);
        const clubData = await axios.get(`https://api.mockaroo.com/api/7de66910?count=5&key=${process.env.MOCKAROO_KEY}`);
        const facultyData = await axios.get(`https://api.mockaroo.com/api/f99b1260?count=50&key=${process.env.MOCKAROO_KEY}`);
        const attendanceData = await axios.get(`https://api.mockaroo.com/api/bfdc1f80?count=100&key=${process.env.MOCKAROO_KEY}`);
        await prisma.student.createMany({ data: studentData.data, skipDuplicates: true });
        await prisma.event.createMany({ data: eventData.data, skipDuplicates: true });
        await prisma.club.createMany({ data: clubData.data, skipDuplicates: true });
        await prisma.faculty.createMany({ data: facultyData.data, skipDuplicates: true });
        await prisma.attendance.createMany({ data: attendanceData.data, skipDuplicates: true });
        console.log(`Database has been seeded`);
    }
    catch (error) {
        console.log(error);
    }
};

main();



