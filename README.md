## BASE URL = https://hotel-management-9-egfa.onrender.com

# Hotel-Management
h1>Hotel Management API</h1>

<p>
A full RESTful API for hotel administration created with Node.js, Express, and MongoDB. This API supports full CRUD operations for managing rooms, guests, and bookings, as well as sophisticated relationship capabilities like room availability checking, double-booking prevention, and automatic room status monitoring.
</p>


<hr>

<h2>Features</h2>

<ul>
  <li><b>Full CRUD Operations:</b></li>
  <ul>
    <li>Rooms Management (Create, Read, Update, Delete)</li>
    <li>Guests Management (Create, Read, Update, Delete)</li>
    <li>Bookings Management (Create, Read, Update, Delete)</li>
  </ul>
  <li><b>Advanced Relationship Features:</b></li>
  <ul>
    <li>Room Availability Checking for specific date ranges</li>
    <li>Double-booking Prevention with conflict detection</li>
    <li>Guest Booking History</li>
    <li>Room Booking History</li>
    <li>Cascade Delete Protection (prevents deletion of resources with active bookings)</li>
  </ul>
  <li><b>Smart Automation:</b> Automatic room status updates (available ↔ occupied)</li>
  <li><b>Data Validation:</b> Input validation with proper error messages and HTTP status codes</li>
  <li><b>Pagination & Filtering:</b> Support for pagination, search, and filtering on all list endpoints</li>
  <li><b>RESTful Design:</b> Proper REST API conventions with JSON format</li>
</ul>

<hr>

<h2>Tech Stack</h2>

<ul>
  <li><b>Runtime:</b> Node.js</li>
  <li><b>Framework:</b> Express.js</li>
  <li><b>Database:</b> MongoDB (Mongoose ODM)</li>
  <li><b>Database Hosting:</b> MongoDB Atlas</li>
  <li><b>Additional Libraries:</b> dotenv, cors, morgan, nodemon</li>
</ul>


<hr>

<h2>Installation</h2>

<h3>Prerequisites</h3>
<ul>
  <li><b>Node.js</b> (v14 or higher) - <a href="https://nodejs.org/">Download here</a></li>
  <li><b>MongoDB Atlas Account</b> (free tier) - <a href="https://www.mongodb.com/cloud/atlas/register">Sign up here</a></li>
  <li><b>Postman</b> (optional, for testing) - <a href="https://www.postman.com/downloads/">Download here</a></li>
</ul>

<h3>Step 1: Clone or Download the Project</h3>

<pre>
# If using Git
git clone &lt;your-repository-url&gt;
cd hotel-management-api

# Or download and extract the ZIP file
</pre>

<h3>Step 2: Install Dependencies</h3>

<pre>
npm install
</pre>

<p>This will install all required packages: express, mongoose, dotenv, cors, morgan, and nodemon.</p>

<h3>Step 3: Set Up MongoDB Atlas</h3>

<ol>
  <li><b>Create a MongoDB Atlas Account</b>
    <ul>
      <li>Go to <a href="https://www.mongodb.com/cloud/atlas/register">MongoDB Atlas</a></li>
      <li>Sign up for a free account</li>
    </ul>
  </li>
  <li><b>Create a New Cluster</b>
    <ul>
      <li>Click "Build a Database"</li>
      <li>Choose "M0 FREE" tier</li>
      <li>Select a cloud provider and region (choose closest to you)</li>
      <li>Click "Create"</li>
    </ul>
  </li>
  <li><b>Create Database User</b>
    <ul>
      <li>Go to "Database Access" (left sidebar)</li>
      <li>Click "Add New Database User"</li>
      <li>Username: <code>hotelAdmin</code> (or your choice)</li>
      <li>Password: Generate a strong password (SAVE THIS!)</li>
      <li>Database User Privileges: "Atlas admin"</li>
      <li>Click "Add User"</li>
    </ul>
  </li>
  <li><b>Configure Network Access</b>
    <ul>
      <li>Go to "Network Access" (left sidebar)</li>
      <li>Click "Add IP Address"</li>
      <li>Click "Allow Access from Anywhere" (0.0.0.0/0)</li>
      <li>Click "Confirm"</li>
    </ul>
  </li>
  <li><b>Get Connection String</b>
    <ul>
      <li>Go to "Database" (left sidebar)</li>
      <li>Click "Connect" on your cluster</li>
      <li>Choose "Connect your application"</li>
      <li>Copy the connection string</li>
    </ul>
  </li>
</ol>

<h3>Step 4: Configure Environment Variables</h3>

<p>Create a <code>.env</code> file in the root directory:</p>

<pre>
PORT=3000
MONGO_URI=mongodb+srv://hotelAdmin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/hotel-management?retryWrites=true&w=majority
NODE_ENV=development
</pre>

<p><b>⚠️ Important:</b></p>
<ul>
  <li>Replace <code>YOUR_PASSWORD</code> with your actual MongoDB user password</li>
  <li>Replace the cluster URL with your actual cluster URL</li>
  <li>Add <code>/hotel-management</code> before the <code>?</code> to specify the database name</li>
</ul>

<h3>Step 5: Seed the Database</h3>

<p>Populate the database with sample data:</p>

<pre>
npm run seed
</pre>

<p>You should see:</p>

<pre>
MongoDB Connected: cluster0-xxxxx.mongodb.net
✅ Data seeded successfully!
   - 8 rooms created
   - 5 guests created
   - 3 bookings created
</pre>

<hr>

<h2>How to Run</h2>

<h3>Development Mode (with auto-restart):</h3>

<pre>
npm run dev
</pre>

<h3>Production Mode:</h3>

<pre>
npm start
</pre>

<p>You should see:</p>

<pre>
Server running in development mode on port 3000
MongoDB Connected: cluster0-xxxxx.mongodb.net
</pre>

<p><b>✅ Your API is now running at:</b> <code>http://localhost:3000</code></p>

<
