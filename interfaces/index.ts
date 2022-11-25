export interface ProductProps {
    product: {
        id: string;
        comments: [];
        createdAt: string;
        description: string;
        company: string;
        name: string;
        url: string;
        urlImg: string;
        votes: number;
        creator: {
            id: string;
            name: string;
        }
    }
}