import Cookies from "js-cookie";


export const onLoginSuccess = (query: URLSearchParams, token: string) => {
    let url = query.get("url");
    Cookies.set("token", token, {
        expires: 7,
        domain: ".technofleet.org",
        path: "/",
    });

    if (!url) {
        url = "https://technofleet.org";
    }
    // window.location.href = url;
}