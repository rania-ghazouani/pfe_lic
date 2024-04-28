const { PrismaClient } = require("@prisma/client");
const jwt = require("jsonwebtoken");
const randToken = require("rand-token");
const prisma = new PrismaClient();




const generateToken = async({user}) => {    //create token for auth
  try {
  let insertToken = await jwt.sign(
    user, process.env.JWT_SECRET, {
      expiresIn: '7d'
    });
  return insertToken;
  } catch (error) {
    error.message;
  }
  
}


const generateRefreshToken = async({userId}) => {
  try {
    refresh = await jwt.sign({userId}, process.env.JWT_REFRESH_TOKEN,{expiresIn: '1y'});
    return refresh;

  } catch (error) {
    error.message;
  }
}

module.exports = {
  generateToken,
  generateRefreshToken
}


/*const generateToken =  async ({
  foundLogin,
  token = undefined,
  refresh = undefined,
}) => {
  //first, plain generate refresh and token
  const toInsert = {
    token: jsonwebtoken.sign(
      foundLogin,
      process.env.JWT_SECRET,
         {
         expiresIn: 60 * 60 * 24,
         }
    ),
    refresh: genRefreshToken(),
  };
  //blacklist token and refresh used to generate if they exist
  if (token) {
    await prisma.token.update({
      where: {
        tokenId: (await prisma.token.findFirst({ where: { token } })).tokenId,
      },
      data: {
        isBlacklisted: true,
      },
    });
  }
  if (refresh) {
    await prisma.token.update({
      where: {
        tokenId: (await prisma.token.findFirst({ where: { token: refresh } })).tokenId,
      },
      data: {
        isBlacklisted: true,
      },
    });
  }
  
  
  //insert token with reference to inserted refresh
  await prisma.token.create({
    data: {
      token: toInsert.token,
      isBlacklisted: false,
      isRefresh: false,
      user: {
        connect: {
          email: foundLogin.email,
        },
      },
      assignedRefresh: {
        create: {
          token: toInsert.refresh,
          isBlacklisted: false,
          isRefresh: true,
          user:{
            connect:{
              email: foundLogin.email
            }
          },
        },
      },
    },
  });
  return toInsert;
};*/
