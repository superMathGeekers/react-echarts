import React from 'react';
import { notification, message } from 'antd';

export function checkStatus(response) {
    if (response.status >= 200 && response.status < 400) {
        return response;
    } else {
        var error = new Error(response.statusText)
        error.response = response
        throw error
    }
}

export function parseJSON(response) {
    return response.json()
}

export let headers = new Headers({
    'Accept': 'application/json',
    'Content-Type': 'application/json;charset=UTF-8',
    'Access-Control-Allow-Credentials': 'true',
})

export function myFetch(url, option) {

    let defaultOption = {
        credentials: 'include',
        // redirect: 'follow',
        // mode: 'cors',
    }
    return fetch(url, Object.assign({}, defaultOption, option))
        .then(checkStatus)
        .then(parseJSON)
        .then(response => {
            message.destroy();
            return response;
        }).catch(error => {
            notification.error({
                message: `${error.message}`,
                description: <pre>{error.stack}</pre>,
                duration: 0,
            });
        });
}

/**
 * 一维JS对象 转 formData
 * @param {*} data 
 */
export function serializeToFormData(data = {}) {
    // 过滤 null/undefined 转为 formData
    let formData = new FormData();
    Object.keys(data).filter(i => data[i] != null && data[i] != undefined).forEach(i => {
        formData.append(i, data[i]);
    });
    return formData;
}