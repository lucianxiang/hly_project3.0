/**
 * Created by leibo on 18/4/17.
 */
export default {
  initCarRentalIndexInfo(state, data) {
    state.carRentalIndexInfo = data;
  },
  initCarRentalIndexInfoObj(state, obj) {
    state.carRentalIndexInfoObj = obj;
  },
  updateCarRentalIndexInfoObj(state, obj) {
    state.carRentalIndexInfoObj = obj;
  },
  initCarHertzList(state, data) {
    state.carHertzList = data;
  },
  initRentalCarCity(state, data) {
    state.rentalCarCityList = data;
  },
  initCarCityList(state, data) {
    state.carCityList = data;
  },
  initCityPlaceHome(state, data) {
    state.cityPlaceHomeList = data;
  },
  initCityPlace(state, data) {
    state.cityPlaceList = data;
  },
  initReturnCityPlace(state, data) {
    state.returnCityPlaceList = data;
  },
  carBlockTypeList(state, data) {
    state.carBlockTypeList = data;
  },
  carModelList(state, data) {
    state.carModelList = data;
  },
  carBrandList(state, data) {
    state.carBrandList = data;
  },
  carCompanyList(state, data) {
    state.carCompanyList = data;
  },
  GiveBackStore(state, obj) {
    state.GiveBackStoreObj = obj;
  },
  TakeStore(state, obj) {
    state.TakeStoreObj = obj;
  },
  ProductModel(state, obj) {
    state.ProductModelObj = obj;
  },
  HertzModel(state, obj) {
    state.HertzModelObj = obj;
  },
  IncentivesList(state, data) {
    state.IncentivesList = data;
  },
  initCarOrderDetail(state, obj) {
    state.carOrderDetailObj = obj
  },
}
