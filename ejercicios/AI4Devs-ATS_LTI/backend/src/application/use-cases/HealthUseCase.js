// Caso de uso simple para health check
export const getHealth = () => {
    return {
        status: 'ok',
        message: 'LTI ATS Backend está funcionando',
        timestamp: new Date().toISOString()
    };
};

