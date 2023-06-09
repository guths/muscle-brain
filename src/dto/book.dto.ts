export interface CreateBookDto {
    google_book_id: string;
    title: string;
    publisher_name: string;
    published_date: Date;
    description: string;
    page_count: number;
    main_category: string;
    average_rating?: number;
    image_link_small?: string;
    image_link_medium?: string;
    image_link_large?: string;
    language: string
    list_price_amount?: number;
    list_price_currency?: String;
    category_names: Array<string> | null;
    authors: Array<string>
}