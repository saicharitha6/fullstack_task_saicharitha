# Full Stack Task

Please choose any of the following tasks

1. Implement a solution in Node.js using MQTT and HTTP that creates a
basic to-do list, with the following functionalities -
Add new items to the list by sending a message to /add topic of the
MQTT Broker
Store the items as a stringified Array in a Redis Cache with a single key
called FULLSTACK_TASK_<YOUR_FIRST_NAME>
If there are more than 50 items in the cache, move them to a MongoDB
Collection and flush them from the Cache
Retrieve all items in the list through /fetchAllTasks endpoint of a HTTP
API
Make the following frontend in React.js/Vue.js/Svelte.js and integrate
with the backend -

https://www.figma.com/embed?embed_host=notion&url=https%
3A%2F%2Fwww.figma.com%2Fproto%2Fx3I0bqXvZeMQ34gAf
LUogk%2FNote-App%3Fnode-id%3D0%253A3%26scaling%3D
scale-down%26page-id%3D0%253A1

Use CSS/SCSS for basic styling with reusable classes
Make reusable components/templates wherever possible
Use of Tailwind CSS will be a plus, but isn't a must
Design must be responsive and fit accordingly on Tablet and Mobile
Screens

OR

# Full Stack Task 2

2. Implement a solution in Node.js using WebSockets (Native or Socket.io)
and HTTP, that creates a basic to-do list, with the following
functionalities -
Add new items to the list by sending a message with add event to the
WS Server
Store the items as a stringified Array in a Redis Cache with a single key
called FULLSTACK_TASK_<YOUR_FIRST_NAME>
If there are more than 50 items in the cache, move them to a MongoDB
Collection and flush them from the Cache.
Retrieve all items in the list through /fetchAllTasks endpoint of a HTTP
API
Make the following frontend in React.js/Vue.js/Svelte.js and integrate
with the backend -

https://www.figma.com/embed?embed_host=notion&url=https%
3A%2F%2Fwww.figma.com%2Fproto%2Fx3I0bqXvZeMQ34gAf
LUogk%2FNote-App%3Fnode-id%3D0%253A3%26scaling%3D
scale-down%26page-id%3D0%253A1

Use CSS/SCSS for basic styling with reusable classes
Make reusable components/templates wherever possible
Use of Tailwind CSS will be a plus, but isn't a must
Design must be responsive and fit accordingly on Tablet and Mobile
Screens

Redis Configuration -
Host: redis-12675.c212.ap-south-1-1.ec2.cloud.redislabs.com
Port: 12675
Username: default
Password: dssYpBnYQrl01GbCGVhVq2e4dYvUrKJB

Full Stack Task 3
MongoDB Configuration -

DB URL: mongodb+srv://assignment_user:HCgEj5zv8Hxwa4xO@test-
cluster.6f94f5o.mongodb.net/

Database: assignment
Collection: assignment_<your_first_name>

The project MUST be written using TypeScript, utilizing suitable types,
wherever required.
