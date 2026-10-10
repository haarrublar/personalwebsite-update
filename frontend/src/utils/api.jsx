import { AuthorStudies } from "../static/author-studies";
import { AuthorInfo } from "../static/author-info";
import { Expertise } from "../static/expertise";
import { WorkExperience } from "../static/work-experience";
import { AcademicParticipation } from "../static/academic-participation";
import { Post } from "../static/post";
import { Publication } from "../static/publication";
import { Project } from "../static/project";

export const get_author_info = async () => {
    return AuthorInfo
}

export const get_study = async () => {
    return AuthorStudies
}

export const get_expertise = async () => {
    return Expertise
}

export const get_work_experience = async () => {
    return WorkExperience
}

export const get_academic_participation = async () => {
    return AcademicParticipation
}

export const get_project = async () => {
    return Project
}


export const get_publication = async () => {
    return Publication
}


export const get_post = async () => {
    return Post
}
