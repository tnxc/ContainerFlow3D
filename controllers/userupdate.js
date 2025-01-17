const User = require('../models/User'); // นำเข้าโมเดล User

const updateUser = async (req, res) => {
  try {
    const { email } = req.params;
    const { firstname, lastname, password } = req.body;

    // ค้นหาและอัปเดตข้อมูล
    const updatedUser = await User.findOneAndUpdate(
      { email }, // เงื่อนไขค้นหา
      { $set: { firstname, lastname, password } }, // ข้อมูลที่อัปเดต
      { new: true, runValidators: true } // ส่งคืนข้อมูลที่อัปเดต
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'User updated successfully', data: updatedUser });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { updateUser };
