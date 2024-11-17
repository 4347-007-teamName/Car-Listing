const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function seed() {
  // Clear existing data
  await prisma.user.deleteMany({});
  await prisma.vehicle.deleteMany({});
  await prisma.listing.deleteMany({});
  await prisma.buyer.deleteMany({});
  await prisma.seller.deleteMany({});
  await prisma.financinginfo.deleteMany({});

// Seed users
const createMany = await prisma.user.createMany({
  data: [
    { userid: 1, username: 'john_doe', firstname: 'John', middleinit: 'A', lastname: 'Doe', isAdmin: false },
    { userid: 2, username: 'jane_smith', firstname: 'Jane', middleinit: 'B', lastname: 'Smith', isAdmin: false },
    { userid: 3, username: 'mark_johnson', firstname: 'Mark', middleinit: 'C', lastname: 'Johnson', isAdmin: false },
    { userid: 4, username: 'lisa_brown', firstname: 'Lisa', middleinit: 'D', lastname: 'Brown', isAdmin: false },
    { userid: 5, username: 'peter_parker', firstname: 'Peter', middleinit: 'E', lastname: 'Parker', isAdmin: false },
    { userid: 6, username: 'clark_kent', firstname: 'Clark', middleinit: 'F', lastname: 'Kent', isAdmin: false},
    { userid: 7, username: 'bruce_wayne', firstname: 'Bruce', middleinit: 'G', lastname: 'Wayne', isAdmin: false },
    { userid: 8, username: 'tony_stark', firstname: 'Tony', middleinit: 'H', lastname: 'Stark', isAdmin: false },
    { userid: 9, username: 'natasha_romanoff', firstname: 'Natasha', middleinit: 'I', lastname: 'Romanoff', isAdmin: false },
    { userid: 10, username: 'diana_prince', firstname: 'Diana', middleinit: 'J', lastname: 'Prince', isAdmin: false },
    { userid: 11, username: 'admin', firstname: 'admin', middleinit: 'A', lastname: 'admin', isAdmin: true },

  ]
});

// Seed vehicles
const vehicles = await prisma.vehicle.createMany({
  data: [
    { vinnum: '1HGCM82633A123456', year: 2005, make: 'Honda', model: 'Accord', trim_lvl: 'EX', mileage: 120000, color: 'Blue', type: '4-door' },
    { vinnum: '1FTFW1ET0EKE12345', year: 2014, make: 'Ford', model: 'F-150', trim_lvl: 'Lariat', mileage: 80000, color: 'Red', type: '4-door' },
    { vinnum: '2FMDK3KC7DBA98765', year: 2013, make: 'Ford', model: 'Edge', trim_lvl: 'SEL', mileage: 60000, color: 'Black', type: '4-door' },
    { vinnum: '1C4RJFBGXEC123456', year: 2014, make: 'Jeep', model: 'Grand Cherokee', trim_lvl: 'Limited', mileage: 70000, color: 'White', type: '4-door' },
    { vinnum: '1N4AL3AP7EC123456', year: 2014, make: 'Nissan', model: 'Altima', trim_lvl: '2.5 SV', mileage: 50000, color: 'Silver', type: '4-door' },
    { vinnum: '1HGCR2F3XFA123456', year: 2015, make: 'Honda', model: 'Civic', trim_lvl: 'LX', mileage: 30000, color: 'Gray', type: '4-door' },
    { vinnum: '1GNEK13Z03J123456', year: 2003, make: 'Chevrolet', model: 'Tahoe', trim_lvl: 'LT', mileage: 150000, color: 'Green', type: '4-door' },
    { vinnum: '1ZVBP8AM1A1234567', year: 2010, make: 'Ford', model: 'Mustang', trim_lvl: 'GT', mileage: 45000, color: 'Yellow', type: '2-door' },
    { vinnum: '1FAHP2E84BG123456', year: 2011, make: 'Ford', model: 'Taurus', trim_lvl: 'SEL', mileage: 70000, color: 'Blue', type: '4-door' },
    { vinnum: '2C4RDGEG7ER123456', year: 2014, make: 'Chrysler', model: 'Town & Country', trim_lvl: 'Limited', mileage: 80000, color: 'Brown', type: '4-door' },
  ]
});

// Seed listings
const listings = await prisma.listing.createMany({
  data: [
    { sellerid: 1, vinnum: '1HGCM82633A123456', price: 8000.00, description: 'Well maintained Honda Accord.', datelisted: new Date('2023-10-01') },
    { sellerid: 2, vinnum: '1FTFW1ET0EKE12345', price: 25000.00, description: 'Great condition Ford F-150.', datelisted: new Date('2023-09-15') },
    { sellerid: 3, vinnum: '2FMDK3KC7DBA98765', price: 22000.00, description: 'Family-friendly Ford Edge.', datelisted: new Date('2023-08-20') },
    { sellerid: 4, vinnum: '1C4RJFBGXEC123456', price: 30000.00, description: 'Luxury Jeep Grand Cherokee.', datelisted: new Date('2023-07-30') },
    { sellerid: 5, vinnum: '1N4AL3AP7EC123456', price: 15000.00, description: 'Economical Nissan Altima.', datelisted: new Date('2023-06-25') },
    { sellerid: 6, vinnum: '1HGCR2F3XFA123456', price: 18000.00, description: 'Reliable Honda Civic.', datelisted: new Date('2023-10-10') },
    { sellerid: 7, vinnum: '1GNEK13Z03J123456', price: 15000.00, description: 'Spacious Chevrolet Tahoe.', datelisted: new Date('2023-10-05') },
    { sellerid: 8, vinnum: '1ZVBP8AM1A1234567', price: 30000.00, description: 'Classic Ford Mustang GT.', datelisted: new Date('2023-09-01') },
    { sellerid: 9, vinnum: '1FAHP2E84BG123456', price: 16000.00, description: 'Comfortable Ford Taurus.', datelisted: new Date('2023-09-12') },
    { sellerid: 10, vinnum: '2C4RDGEG7ER123456', price: 21000.00, description: 'Versatile Chrysler Town & Country.', datelisted: new Date('2023-09-20') },
  ]
});

// Seed buyers
const buyers = await prisma.buyer.createMany({
  data: [
    { userid: 1, numofpurchase: 5, buyerrating: 4.5 },
    { userid: 2, numofpurchase: 10, buyerrating: 4.8 },
    { userid: 3, numofpurchase: 2, buyerrating: 4.0 },
    { userid: 4, numofpurchase: 3, buyerrating: 4.2 },
    { userid: 5, numofpurchase: 1, buyerrating: 5.0 },
    { userid: 6, numofpurchase: 4, buyerrating: 3.8 },
    { userid: 7, numofpurchase: 6, buyerrating: 4.1 },
    { userid: 8, numofpurchase: 5, buyerrating: 4.7 },
    { userid: 9, numofpurchase: 2, buyerrating: 4.6 },
    { userid: 10, numofpurchase: 7, buyerrating: 4.9 },
  ]
});

// Seed sellers
const sellers = await prisma.seller.createMany({
  data: [
    { userid: 1, numofsale: 10, sellerrating: 4.6, financingoffered: true },
    { userid: 2, numofsale: 8, sellerrating: 4.9, financingoffered: false },
    { userid: 3, numofsale: 5, sellerrating: 4.5, financingoffered: true },
    { userid: 4, numofsale: 3, sellerrating: 4.3, financingoffered: false },
    { userid: 5, numofsale: 7, sellerrating: 4.8, financingoffered: true },
    { userid: 6, numofsale: 9, sellerrating: 4.1, financingoffered: false },
    { userid: 7, numofsale: 4, sellerrating: 4.4, financingoffered: true },
    { userid: 8, numofsale: 12, sellerrating: 4.7, financingoffered: false },
    { userid: 9, numofsale: 5, sellerrating: 4.2, financingoffered: true },
    { userid: 10, numofsale: 6, sellerrating: 4.5, financingoffered: false },
  ]
});

// Seed financing info
const financinginfos = await prisma.financinginfo.createMany({
  data: [
    { sellerid: 1, interestrate: 3.5 },
    { sellerid: 3, interestrate: 4.0 },
    { sellerid: 5, interestrate: 3.0 },
    { sellerid: 7, interestrate: 3.8 },
    { sellerid: 9, interestrate: 4.5 },
  ]
});


  console.log('Seeding completed successfully!');
}

seed()
  .catch((error) => {
    console.error('Error during seeding:', error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
