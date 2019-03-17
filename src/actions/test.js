/*
 * action 类型
 */
import * as actionTypes from './actionTypes';
/* 
  fetch tool
*/
import { checkStatus, parseJSON, headers, myFetch, serializeToFormData } from '../util/fetchTool';
import { notification, message } from 'antd';

export function listCreater(data) {
    return { type: actionTypes.TEST_LIST, data }
}

export const list = (data = {}) => (dispatch, getState) => {
    message.loading('正在加载...');
    /**
     * 接口测试地址
     */
    return myFetch('/en/enPublishInfo/achievement/list/json').then(response => {
        if (response) {
            !response.data && (response.data = []);
            dispatch(listCreater(response.data));
        }
    });
}