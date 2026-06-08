// Seed users. Run: npm run seed
// Registers ONLY tescosalescrm@gmail.com (removes any other users first).
require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');

const users = [
  {
    name: 'Tesco Sales CRM',
    email: 'tescosalescrm@gmail.com',
    employeeId: 'EMP001',
    role: 'Sales Coordinator',
    password: 'password123',
  },
];

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // Remove every user that is not in the list above
    const keepEmails = users.map((u) => u.email);
    const removed = await User.deleteMany({ email: { $nin: keepEmails } });
    if (removed.deletedCount) console.log(`Removed ${removed.deletedCount} other user(s)`);

    for (const u of users) {
      const exists = await User.findOne({ email: u.email });
      if (exists) {
        // Update role/name if they changed
        exists.name = u.name;
        exists.role = u.role;
        await exists.save({ validateBeforeSave: false });
        console.log(`Updated (exists): ${u.email} → ${u.role}`);
        continue;
      }
      await User.create(u); // password hashed by pre-save hook
      console.log(`Created: ${u.email} (${u.role})`);
    }

    console.log('Seeding complete');
    process.exit(0);
  } catch (err) {
    console.error('Seed error:', err);
    process.exit(1);
  }
})();
