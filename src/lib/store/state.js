export const state = {
  user: '' || JSON.parse(localStorage.getItem('USER')),
  auth: '' || JSON.parse(localStorage.getItem('AUTH')),
  shouldLogin: false,
  loginTips: 'WelCome to iBeta'
}
