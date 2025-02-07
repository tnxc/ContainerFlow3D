const Box = require('../models/Box'); 

module.exports = async (req, res) => {
    if (!req.session.userId) {
        return res.redirect('/login');
    }

    try {
        const userId = req.session.userId; 
        const boxes = await Box.find({ userId });
        const uniqueContainers = boxes.reduce((acc, current) => {
            if (!acc.some(item => item.nameInput === current.nameInput)) {
                acc.push(current); 
            }
            return acc;
        }, []);

        res.render('dashboard.ejs', {
            userName: req.session.userName, 
            userId: req.session.userId,
            uniqueContainers, 
            boxes: JSON.stringify(boxes)
        });

    } catch (error) {
        console.error("Error fetching data from MongoDB:", error);
        res.status(500).send("Internal Server Error");
    }
};
