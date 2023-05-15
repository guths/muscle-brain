export class PublisherService { 
    constructor(private publisherRepository: PublisherService) {}

    async createPublisher(name: string) {
        return await this.publisherRepository.createPublisher(name); 
    }
}