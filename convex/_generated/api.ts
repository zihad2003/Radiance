function func(name) {
    return { functionName: name, isPublic: true };
}

export const api = {
    chat: {
        sendMessage: func("chat:sendMessage"),
    },
    bookings: {
        getBookings: func("bookings:getBookings"),
        updateStatus: func("bookings:updateStatus"),
        createBooking: func("bookings:createBooking"),
    },
    products: {
        list: func("products:list"),
    },
};
export const internal = {};
