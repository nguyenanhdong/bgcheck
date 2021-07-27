import { } from "../Services"

export type ScanHistoryProps = {
    product: ProductInfo,
    time: number
}

export type DaiLyNCCProps = {
    DiaChi: "Thành phố Bắc Ninh"
    Email: "soche@gmail.com"
    Id: 11
    Mota: null
    NoiDung: ""
    Phone: "0222 333 888"
    ProductId: 23
    SupplierId: 9
    Ten: "Công ty sản xuất ban đầu "
    TenLoaiNhaCC: "Doanh nghiệp sản xuất ban đầu"
    Type: 1
}
export type ProductDiem = {
    ChatLuong: null | number
    DiemCongDong: null | number
    DiemTiepThi: null | number
    NhuCau: null | number
}
export type NhanXetProps = {
    Avatar: null
    CountTotal: 2
    Diem: 5
    Id: 1007
    Loai: number
    NgayTao: "/Date(1595391150163)/"
    NguoiTao: 1
    NoiDung: "Tốt"
    ProductId: 22
    TenKhachHang: "Thế Thắng"
    TenSanPham: "Súp lơ"
    TrangThai: 1
    UserName: "demo"
}
export class ProductInfo {
    temId: number;
    Diem: ProductDiem
    DoanhNghiep: {
        Address: "Thành phố bắc ninh"
        ApprovedBy: 1
        ApprovedDate: "/Date(1598490000000)/"
        AvgRate: 0
        ChucVu: "Giám đốc"
        CompanyFormId: 1
        CompanyId: 144
        DiaChi: "Bắc Ninh"
        DonviQlyId: 142
        Email: "1admin@gmail.com"
        EmailDaiDien: "tuvv@gmail.com"
        Fax: null
        GhiChu: null
        Id: 1
        IsApproved: 3
        LogoUrl: "/DATA/Company/2020/Logo/lg1.jpg"
        MaSoThue: "2300100236"
        Mobile: "0888 789 955"
        NgayCap: "/Date(1236790800000)/"
        NgaySinh: "/Date(536432400000)/"
        NgayTao: "/Date(1578099600000)/"
        NguoiDaiDien: "Vũ Văn Tú"
        NumRate: 0
        Phone: "0919 919 918"
        PhuongXaId: 4479
        QuanHuyenId: 3345
        SiteUrl: "bacninh.vnpt.vn"
        SoDKKD: "12345678"
        Ten: "Công Ty TNHH MTV Trái Cây Xanh"
        TinhId: 138
        TrangThai: 1
    }
    NhaCungCap: Array<DaiLyNCCProps>
    NhanXet: Array<NhanXetProps>
    OCOP: number
    SanPham: {
        ApprovedBy: 1
        ApprovedDate: "/Date(1589337838613)/"
        AvgRate: 0
        CategoryId: 168
        CompanyId: 144
        CreatedBy: 1082
        CreatedDate: "/Date(1589337327047)/"
        DonViTinhId: 6
        Id: 23
        IsActived: 0
        IsApproved: 3
        IsDeleted: 0
        IsLocked: 0
        LongDesc: string
        NumRate: null
        SendedBy: 1082
        SendedDate: "/Date(1589337815497)/"
        ShortDesc: null
        Tag: null
        Ten: "Cà chua bi"
        TrangThai: 0
        UnitPrice: 1000
        UpdatedBy: 1082
        UpdatedDate: "/Date(1589337801220)/"
        UrlThumb: "/DATA/2020/5/13/product9778.jpg"
        VungSanXuatId: -1
    }
}