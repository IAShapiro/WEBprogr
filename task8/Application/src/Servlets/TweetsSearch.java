package Servlets;

import com.google.gson.Gson;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.stream.Collectors;

@WebServlet("/tweets/search")
public class TweetsSearch extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        Posts posts = Tweets.getPosts();
            Gson gson = new Gson();
            resp.getWriter().print(posts.getAll().stream().map(gson::toJson).
                    collect(Collectors.joining("\n")));
    }


}
