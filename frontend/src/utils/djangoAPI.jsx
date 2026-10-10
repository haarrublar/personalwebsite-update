import axios from "axios";

const BASE_URL = 'http://127.0.0.1:8000/api';
const AUTHORINFO_URL = `${BASE_URL}/author-info`
const AUTHORSTUDY_URL = `${BASE_URL}/author-studies`
const EXPERTISE_URL = `${BASE_URL}/expertise`
const WORKEXPERIENCE_URL = `${BASE_URL}/work-experience`
const ACADEMICPARTICIPATION_URL = `${BASE_URL}/academic-participation`
const PROJECT_URL = `${BASE_URL}/project`
const PUBLICATION_URL = `${BASE_URL}/publication`
const POST_URL = `${BASE_URL}/post`


export const get_author_info = async () => {
    try {
        const response = await axios.get(
            AUTHORINFO_URL, {
                withCredentials: false
            }
        );
        return response.data
    } catch (error) {
        return error 
    }
}

export const get_study = async () => {
    try {
        const response = await axios.get(
            AUTHORSTUDY_URL, {
                withCredentials: false
            }
        );
        return response.data
    } catch (error) {
        return error 
    }
}

export const get_expertise = async () => {
    try {
        const response = await axios.get(
            EXPERTISE_URL, {
                withCredentials: false
            }
        );
        return response.data
    } catch (error) {
        return error 
    }
}


export const get_work_experience = async () => {
    try {
        const response = await axios.get(
            WORKEXPERIENCE_URL, {
                withCredentials: false
            }
        );
        return response.data
    } catch (error) {
        return error 
    }
}



export const get_academic_participation = async () => {
    try {
        const response = await axios.get(
            ACADEMICPARTICIPATION_URL, {
                withCredentials: false
            }
        );
        return response.data
    } catch (error) {
        return error 
    }
}


export const get_project= async () => {
    try {
        const response = await axios.get(
            PROJECT_URL, {
                withCredentials: false
            }
        );
        return response.data
    } catch (error) {
        return error 
    }
}


export const get_publication= async () => {
    try {
        const response = await axios.get(
            PUBLICATION_URL, {
                withCredentials: false
            }
        );
        return response.data
    } catch (error) {
        return error 
    }
}


export const get_post= async () => {
    try {
        const response = await axios.get(
            POST_URL, {
                withCredentials: false
            }
        );
        return response.data
    } catch (error) {
        return error 
    }
}