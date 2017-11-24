var express =  require('express')
var path = require('path')
var bodyParser = require('body-parser')
var objectAssign = require('object-assign')

const app = express();
var port = 3333;
var env = process.env.NODE_ENV;

app.set('view engine', 'html');
app.use(express.static(path.resolve(__dirname, './dist')));
app.use(bodyParser.raw({limit: '10mb'}));
app.use(bodyParser.text({ limit:'10mb',type: 'text/*' }));
app.use(bodyParser.json({limit: '10mb'}));
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}));

app.use((request, response, next)=>{
		// Website you wish to allow to connect
		response.setHeader('Access-Control-Allow-Origin', '*');

		// Request methods you wish to allow
		response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

		// Request headers you wish to allow
		response.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,key,by-pass,Accept-Encoding,token,source,unique_device_id,accept');

		// Set to true if you need the website to include cookies in the requests sent
		// to the API (e.g. in case you use sessions)
		response.setHeader('Access-Control-Allow-Credentials', true);

		next();
	});

let employees = []

function getEmployeesList(req,res,next){
	res.status(200)
	res.json(employees)
}

function saveEmployee(req,res,next){
	var emp = req.body
	employees.push(emp)
	console.log(employees)
	res.status(200).json(employees)
}

function updateEmployee(req,res,next){
	var id = req.params.id,
		data = req.body
		for(var i=0;i<employees.length;i++){
			var emp = employees[i]
			if(emp.id==id){
				emp = objectAssign({},emp,data)	
			}
			employees[i] = emp
		}
		res.status(200).json(employees)
}

function removeEmployee(req,res,next){
	var id = req.params.id
	employees = employees.filter((emp)=>{
		if(emp.id==id){
			return false
		}
		return true
	})
	res.status(200).json(employees)
}

app.get('/employees',getEmployeesList)
app.post('/employees',saveEmployee)
app.put('/employee/:id',updateEmployee)
app.delete('/employee/:id',removeEmployee)

var server = app.listen(port, ()=>{
	var host = server.address().address;
	var port = server.address().port;
	//socket.init();
	console.log('App listening at http://%s:%s', host,port);
});
