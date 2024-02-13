interface Login {
    username: string | null;
    password: string | null;
}
interface Candidate {
    alamat: string | null;
    dapil: number | null;
    foto_caleg: string | null;
    id: number | null;
    jenis_dapil: string | null;
    jenis_kelamin: string | null;
    logo_partai: string | null;
    nama_calon: string | null;
    nama_partai: string | null;
    no_urut: number | null;
    suara?: number | null;
}

let defaultCandidateValue: Candidate = {
    alamat: null,
    dapil: null,
    foto_caleg: null,
    id: null,
    jenis_dapil: null,
    jenis_kelamin: null,
    logo_partai: null,
    nama_calon: null,
    nama_partai: null,
    no_urut: null,
    suara: null
}

interface VoteCaleg {
    id_caleg: number | null,
    no_tps: number | null,
    total_suara: number | null,
    upload_bukti?: string | null
}

let defaultVoteCaleg: VoteCaleg = {
    id_caleg: null,
    no_tps: null,
    total_suara: null,
}

interface ProgressIndicator {
    value: number;
    view: boolean;
}

let defaultProgressIndicator: ProgressIndicator = {
    value: 0,
    view: false
}

let defaultLogin: Login = {
    username: null,
    password: null
}

interface Vote {
    id: number | null;
    id_caleg: number | null;
    tps: number | null;
    suara: number | null;
    file_bukti: string | null;
}

let defaultVote: Vote = {
    id: null,
    id_caleg: null,
    tps: null,
    suara: null,
    file_bukti: null
}

// new

interface User {
    id: string | null;
    name: string | null;
    username: string | null;
    dapil: any | null;
    jenis_dapil: any | null;
}

let defaultUser: User = {
    id: null,
    name: null,
    username: null,
    dapil: null,
    jenis_dapil: null
}

interface TotalSuaraPartai {
    suara: number | null;
    nama_partai: string | null;
    logo_partai: string | null;
    percent: string | null;
}

let defaultTotalSuaraPartai: TotalSuaraPartai = {
    suara: null,
    nama_partai: null,
    logo_partai: null,
    percent: null
}

interface TotalTps {
    total_tps: string | null;
    total_tps_masuk: number | null;
    percent: string | null;
    total_relawan: number | null;
}

let defaultTotalTps: TotalTps = {
    total_tps: null,
    total_tps_masuk: null,
    percent: null,
    total_relawan: null
}

interface DashFilterData {
    provinsi: string | null;
    kota: string | null;
    kec: string | null;
    kel: string | null;
}

let defaultDashFilterData: DashFilterData = {
    provinsi: '',
    kota: '',
    kec: '',
    kel: ''
}

interface Provinsi {
    id: number | null;
    n_provinsi: string | null;
    inisial: string | null;
}

let defaultProvinsi: Provinsi[] = []

interface Kota {
    id: number | null;
    provinsi_id: string | null;
    n_kota: string | null;
}

let defaultKota: Kota[] = []

interface Kecamatan {
    id: number | null;
    kota_id: string | null;
    n_kecamatan: string | null;
}

let defaultKecamatan: Kecamatan[] = []

interface Kelurahan {
    id: number | null;
    kecamatan_id: string | null;
    n_kelurahan: string | null;
}

let defaultKelurahan: Kelurahan[] = []

interface Paslon {
    id: number | null;
    no_urut: number | null;
    n_calon: string | null;
    n_wakil_calon: string | null;
}

let defaultPaslon: Paslon[] = [];

interface SuaraPaslon {
    n_calon: string;
    no_urut: number;
    suara: string;
    percent: string;
}

let defaultSuaraPaslon: SuaraPaslon[] = [];

interface TotalTPS {
    jumlah_tps: string | null
}

let defaultTotalTPS: TotalTPS = {
    jumlah_tps: null
};

interface TotalMasukTPS {
    suara: string | null;
    total_tps_masuk: number | null
}

let defaultTotalMasukTPS: TotalMasukTPS[] = []

interface TPSdetail {
    id_kecamatan: number | null;
    id_kelurahan: number | null;
    n_kecamatan: string | null;
    n_kota: string | null;
    n_kelurahan: string | null;
    total_suara: string | null;
    total_tps_masuk: number | null;
}

let defaultTPSdetail: TPSdetail[] = []

export {
    Candidate,
    defaultCandidateValue,
    VoteCaleg,
    defaultVoteCaleg,
    ProgressIndicator,
    defaultProgressIndicator,
    Login,
    defaultLogin,
    Vote,
    defaultVote,
    User,
    defaultUser,
    TotalSuaraPartai,
    defaultTotalSuaraPartai,
    TotalTps,
    defaultTotalTps,
    DashFilterData,
    defaultDashFilterData,
    Provinsi,
    defaultProvinsi,
    Kota,
    defaultKota,
    Kecamatan,
    defaultKecamatan,
    Kelurahan,
    defaultKelurahan,
    Paslon,
    defaultPaslon,
    SuaraPaslon,
    defaultSuaraPaslon,
    TotalTPS,
    defaultTotalTPS,
    TotalMasukTPS,
    defaultTotalMasukTPS,
    TPSdetail,
    defaultTPSdetail
}