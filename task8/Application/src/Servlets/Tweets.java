package Servlets;

import com.google.gson.Gson;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet("/tweets")
public class Tweets  extends HttpServlet {
    private static Posts posts = new Posts();

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        resp.getWriter().print((new Gson()).toJson(posts.getPost(req.getParameter("id"))));
    }

    @Override
    protected void doDelete(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        resp.getWriter().print(posts.remove(req.getParameter("id")));
    }

    @Override
    protected void doPut(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        resp.getWriter().print(posts.edit(req.getParameter("id"), (new Gson()).fromJson(req.getReader().readLine(), Post.class)));
    }

    public static Posts getPosts() {
        return posts;
    }
}
