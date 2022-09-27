export const testHandler = async (req, res) => {
  // const hostUrl = req.headers['x-forwarded-host'];
  try {
    // console.log('JSON.parse(req.headers): ', hostUrl);
    // await connectDb(uri);
    // const tasks = await Task.find({});
    res.status(200).json({ hello: 'testHandler' });
  } catch (error) {
    res.status(500).json({ msg: error });
  } finally {
    // await closeDb();
  }
};
export const getNewToken = async (req, res) => {
  // const hostUrl = req.headers['x-forwarded-host'];
  try {
    // console.log('JSON.parse(req.headers): ', hostUrl);
    // await connectDb(uri);
    // const tasks = await Task.find({});
    res.status(200).json({ hello: 'getNewToken' });
  } catch (error) {
    res.status(500).json({ msg: error });
  } finally {
    // await closeDb();
  }
};
export const handleEventSub = async (req, res) => {
  // const hostUrl = req.headers['x-forwarded-host'];
  try {
    // console.log('JSON.parse(req.headers): ', hostUrl);
    // await connectDb(uri);
    // const tasks = await Task.find({});
    res.status(200).json({ hello: 'handleEventSub' });
  } catch (error) {
    res.status(500).json({ msg: error });
  } finally {
    // await closeDb();
  }
};
