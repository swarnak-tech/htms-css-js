interface ServiceRequest {
    name: string;
    email: string;
    serviceType: string;
    description: string;
}

let requestList: ServiceRequest[] = [];

const addRequest = (request: ServiceRequest): void=> {
    requestList.push(request);
    //console.log("Service request added:", request);

    // Here you can also add code to save the request to a database or send a notification
};
export{};