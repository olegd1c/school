export interface Menu {
    name:string;
    children: MenuChildren[];
}

export interface MenuChildren {
    name:string;
    permission:string|string[];
    routerLink:string;
}