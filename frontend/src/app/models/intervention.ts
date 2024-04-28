export interface intervention{
    interventionId: number,
    atelier: string,
    ligne: string, 
    date: Date,
    heureApparitionPanne: Date,
    production: string,
    descriptionProbleme: string,
    action: string,
    heureAppelServiceSupport: Date,
    heureValidation: Date,
    intervenant: string,
    productId: number,
    userId: number,
    
}