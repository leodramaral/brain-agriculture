export interface Produtor {
  id: string;
  document: string;
  name: string;
  propriedades: Propriedade[];
  created_at: string;
  updated_at: string;
}

export interface Propriedade {
  id: string;
  produtor_id: string;
  name: string;
  city: string;
  state: string;
  total_area_hectares: number;
  agricultural_area_hectares: number;
  vegetation_area_hectares: number;
  created_at: string;
  updated_at: string;
  culturas?: Cultura[];
}

export interface Cultura {
  id: string;
  propriedade_id?: string;
  name: string;
  safra: number;
  planted_area_hectares: number;
  created_at: string;
  updated_at: string;
}

export interface DashboardStats {
  summary: {
    totalPropriedades: number;
    totalHectares: number;
  };
  charts: {
    byState: {
      name: string;
      value: number;
      percentage: number;
    }[];
    byCulture: {
      name: string;
      value: number;
      percentage: number;
    }[];
    byLandUse: {
      type: string;
      hectares: number;
      percentage: number;
    }[];
  };
}
