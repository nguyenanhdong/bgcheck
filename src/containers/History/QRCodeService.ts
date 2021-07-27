export const BASE_URL = "http://truyxuatnguongoc.bacninh.gov.vn";

function getProductInfo<T>(url: string): Promise<T> {
    return new Promise((res, rej) => {
        fetch(url, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                res(responseJson);
            })
            .catch((error) => {
                console.warn(error);
                rej();
            });
    })
}

function verify<T>(temId: number, temCode: string): Promise<T> {
    return new Promise((res, rej) => {
        let url = `http://truyxuatnguongoc.bacninh.gov.vn/Api/Verify?temId=${temId}&temCode=${temCode}`;
        console.log("urrrlllll", url)
        fetch(url, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                res(responseJson);
            })
            .catch((error) => {
                console.warn(error);
                rej();
            });
    })
}

export default {
    getProductInfo,
    verify
};
