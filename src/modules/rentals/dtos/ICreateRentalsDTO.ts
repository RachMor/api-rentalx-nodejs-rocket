interface ICreateRentalsDTO{
  car_id: string;
  user_id: string;
  expect_end_date: Date;
  id?: string;
  end_date?: Date;
  total?: number;

}

export { ICreateRentalsDTO };
