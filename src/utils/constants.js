const protocol = "http://";
const sProtocol = "https://";

const Domain = protocol+"127.0.0.1:3333";

export default {
	"employeesApi":Domain+'/employees',
	"employeeApi":Domain+'/employee/:id'
}