type Lifestyle = {
  name: string;
};

type MedicalPeriod = {
  header: string;
  text: string;
  medical_image: number;
};

type UNWorkPeriod = {
  header: string;
  text: string;
  un_image: number;
};

type CountryVisited = {
  name: string;
};

type PersonalStory = {
  id: number;
  header: string;
  header_text: string;
  my_lifestyle: Lifestyle[];
  my_childhood_and_school_years_header: string;
  my_childhood_and_school_years_text: string;
  my_student_years_header: string;
  my_student_years_text: string;
  my_medical_period_json: MedicalPeriod[];
  when_worked_at_the_un_json: UNWorkPeriod[];
  countries_visited_json: CountryVisited[];
  footer_text: string;
  created_at: string;
  updated_at: string;
};

export type AboutTypes = {
  status_code: number;
  message: string;
  data: PersonalStory[];
};
