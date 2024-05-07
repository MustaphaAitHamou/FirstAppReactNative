export const verifyCode = async (code) => {
    window.confirmationResult.confirm(code).then((result) => {
        const user = result.user;
        return true;
    }).catch((error) => {
        return false;
    });
}