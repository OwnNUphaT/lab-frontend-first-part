import {type Organizer } from './../types';
import  { type AxiosResponse } from 'axios'
import apiClient from './AxiosClient'

export default {
    getOrganizers() {
        return apiClient.get('/organizers')
    },
    // Save a new event
    saveOrganizer(organizer: Organizer) {
        return apiClient.post('/organizers', organizer)
    },
    getOrganizerById(id: number): Promise<AxiosResponse<Organizer>> {
        return apiClient.get<Organizer>(`/organizers/${id}`)
    },
}