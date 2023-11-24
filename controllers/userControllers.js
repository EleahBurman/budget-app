//@desc Register a user
//@route POST /api/users/register
//@access Public

export const registerUser = async (req, res) => {
  try {
    res.json({
      message: 'Register the user'
    });
  } catch (err) {
    console.log(err);
    res.json({
      message: err
    });
  }
};

//@desc Login a user
//@route POST /api/users/login
//@access Public
export const loginUser = async (req, res) => {
  try {
    res.json({
      message: 'Login the user'
    });
  } catch (err) {
    console.log(err);
    res.json({
      message: err
    });
  }
};

//@desc Login a user
//@route POST /api/users/current
//@access private
export const currentUser = async (req, res) => {
  try {
    res.json({
      message: 'Current user information'
    });
  } catch (err) {
    console.log(err);
    res.json({
      message: err
    });
  }
};